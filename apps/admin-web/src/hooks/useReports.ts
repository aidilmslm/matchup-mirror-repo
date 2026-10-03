import { useCallback, useEffect, useReducer, useRef } from 'react';
import { fetchReports, reportAction } from '../services/reportsService';
import type { Report, ReportStatus, ReportAction } from '../services/reportsService';

const STATUS_MAP: Record<ReportAction, ReportStatus> = {
  resolve: 'Resolved',
  dismiss: 'Dismissed',
};

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; reports: Report[] };

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; reports: Report[] }
  | { type: 'FETCH_ERROR'; message: string }
  | { type: 'UPDATE_STATUS'; id: string; reportStatus: ReportStatus; note?: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };

    case 'FETCH_SUCCESS':
      return { status: 'success', reports: action.reports };

    case 'FETCH_ERROR':
      return { status: 'error', message: action.message };

    case 'UPDATE_STATUS':
      if (state.status !== 'success') return state;

      return {
        ...state,
        reports: state.reports.map((report) =>
          report.id === action.id
            ? {
                ...report,
                status: action.reportStatus,
                adminNote: action.note ?? report.adminNote,
                resolvedAt: new Date().toISOString(),
              }
            : report,
        ),
      };

    default:
      return state;
  }
}

/**
 * Loads reports and exposes moderation actions.
 *
 * Actions persist first and update local state only after the API succeeds,
 * preventing the UI from showing a false successful moderation state.
 */
export function useReports() {
  const [state, dispatch] = useReducer(reducer, { status: 'idle' });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });

    try {
      const reports = await fetchReports();

      if (mountedRef.current) {
        dispatch({ type: 'FETCH_SUCCESS', reports });
      }
    } catch (err) {
      if (mountedRef.current) {
        dispatch({
          type: 'FETCH_ERROR',
          message: err instanceof Error ? err.message : 'Failed to load reports',
        });
      }
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleAction = useCallback(async (id: string, action: ReportAction, note?: string) => {
    const newStatus = STATUS_MAP[action];

    try {
      await reportAction(id, action, note);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update report');
    }

    if (mountedRef.current) {
      dispatch({ type: 'UPDATE_STATUS', id, reportStatus: newStatus, note });
    }
  }, []);

  return {
    loading: state.status === 'idle' || state.status === 'loading',
    error: state.status === 'error' ? state.message : null,
    reports: state.status === 'success' ? state.reports : [],
    reload: load,
    handleAction,
  };
}
