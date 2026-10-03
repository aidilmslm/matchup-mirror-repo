import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { fetchAnalytics } from '../services/analyticsService';
import type {
  AnalyticsData,
  AnalyticsRange,
} from '../services/analyticsService';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: AnalyticsData };

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; data: AnalyticsData }
  | { type: 'FETCH_ERROR'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };

    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.data };

    case 'FETCH_ERROR':
      return { status: 'error', message: action.message };

    default:
      return state;
  }
}

export function useAnalytics() {
  const [range, setRange] = useState<AnalyticsRange>('7d');
  const [state, dispatch] = useReducer(reducer, { status: 'idle' });
  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
  mountedRef.current = true;

  return () => {
    mountedRef.current = false;
  };
}, []);

  const load = useCallback(async (requestedRange: AnalyticsRange) => {
    const requestId = ++requestIdRef.current;

    dispatch({ type: 'FETCH_START' });

    try {
      const data = await fetchAnalytics(requestedRange);

      if (
        !mountedRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      dispatch({ type: 'FETCH_SUCCESS', data });
    } catch (err) {
      if (
        !mountedRef.current ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      dispatch({
        type: 'FETCH_ERROR',
        message:
          err instanceof Error
            ? err.message
            : 'Failed to load analytics',
      });
    }
  }, []);

  useEffect(() => {
    void load(range);
  }, [load, range]);

  const reload = useCallback(() => {
    void load(range);
  }, [load, range]);

  return {
    loading: state.status === 'idle' || state.status === 'loading',
    error: state.status === 'error' ? state.message : null,
    data: state.status === 'success' ? state.data : null,
    range,
    setRange,
    reload,
  };
}
