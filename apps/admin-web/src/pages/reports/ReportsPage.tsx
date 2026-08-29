import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  EmptyState,
  FilterPills,
  PageHeader,
  SearchInput,
  Td,
  Th,
  TableWrapper,
} from '../../components/ui';
import { REPORTS, type Report, type ReportStatus } from '../../mocks/adminData';

const STATUS_TONE: Record<ReportStatus, 'warning' | 'brand' | 'success' | 'neutral'> = {
  pending: 'warning',
  reviewed: 'brand',
  actioned: 'success',
  dismissed: 'neutral',
};

const STATUS_FILTERS: { value: ReportStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'actioned', label: 'Actioned' },
  { value: 'dismissed', label: 'Dismissed' },
];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-NZ', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function ReportsPage() {
  const [reports, setReports] = useState<Report[]>(REPORTS);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ReportStatus | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = reports.find((r) => r.id === selectedId) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesStatus = status === 'all' || r.status === status;
      const matchesQuery =
        !q ||
        r.targetLabel.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q) ||
        r.reporterName.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [reports, query, status]);

  function setReportStatus(id: string, next: ReportStatus) {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
  }

  const pendingCount = reports.filter((r) => r.status === 'pending').length;

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle={
          pendingCount > 0
            ? `${pendingCount} reports need review.`
            : 'All caught up — no reports waiting on review.'
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills options={STATUS_FILTERS} value={status} onChange={setStatus} />
        <SearchInput
          placeholder="Search reported item, reason, reporter…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:w-80"
        />
      </div>

      <TableWrapper>
        <table className="min-w-full divide-y divide-ink-200">
          <thead className="bg-ink-50">
            <tr>
              <Th>Reported</Th>
              <Th>Type</Th>
              <Th>Reason</Th>
              <Th>Reporter</Th>
              <Th>Reported at</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white">
            {filtered.map((r) => (
              <tr
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className="cursor-pointer hover:bg-ink-50"
              >
                <Td className="font-medium text-ink-900">{r.targetLabel}</Td>
                <Td className="capitalize">{r.type}</Td>
                <Td>{r.reason}</Td>
                <Td>{r.reporterName}</Td>
                <Td>{formatDateTime(r.createdAt)}</Td>
                <Td>
                  <Badge tone={STATUS_TONE[r.status]}>{r.status}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <EmptyState
            title="No reports match those filters"
            description="Try a different status or search term."
          />
        ) : null}
      </TableWrapper>

      <Drawer
        open={selected !== null}
        onClose={() => setSelectedId(null)}
        title={selected?.targetLabel ?? ''}
        subtitle={selected ? `Reported by ${selected.reporterName} · ${formatDateTime(selected.createdAt)}` : undefined}
        footer={
          selected ? (
            selected.status === 'pending' || selected.status === 'reviewed' ? (
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setReportStatus(selected.id, 'actioned')}
                >
                  Take action
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setReportStatus(selected.id, 'dismissed')}
                >
                  Dismiss
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setReportStatus(selected.id, 'pending')}
              >
                Reopen report
              </Button>
            )
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Badge tone="neutral" className="capitalize">
                {selected.type}
              </Badge>
              <Badge tone={STATUS_TONE[selected.status]}>{selected.status}</Badge>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Reason
              </p>
              <p className="text-sm font-medium text-ink-900">{selected.reason}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Details
              </p>
              <p className="text-sm leading-relaxed text-ink-700">{selected.details}</p>
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Reported by
              </p>
              <p className="text-sm text-ink-900">{selected.reporterName}</p>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
