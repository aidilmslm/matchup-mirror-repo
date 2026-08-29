import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  EmptyState,
  FilterPills,
  PageHeader,
  SearchInput,
  Td,
  Th,
  TableWrapper,
} from '../../components/ui';
import { IconClock, IconMapPin } from '../../components/ui/icons';
import { ACTIVITIES, type AdminActivity, type ActivityStatus } from '../../mocks/adminData';

const STATUS_TONE: Record<ActivityStatus, 'success' | 'warning' | 'neutral' | 'danger'> = {
  open: 'success',
  full: 'warning',
  cancelled: 'danger',
  completed: 'neutral',
};

const STATUS_FILTERS: { value: ActivityStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'open', label: 'Open' },
  { value: 'full', label: 'Full' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-NZ', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function ActivitiesPage() {
  const [activities, setActivities] = useState<AdminActivity[]>(ACTIVITIES);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<ActivityStatus | 'all'>('all');
  const [sport, setSport] = useState<string>('all');

  const sportOptions = useMemo(
    () => ['all', ...Array.from(new Set(ACTIVITIES.map((a) => a.sport))).sort()],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activities.filter((a) => {
      const matchesStatus = status === 'all' || a.status === status;
      const matchesSport = sport === 'all' || a.sport === sport;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.hostName.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q);
      return matchesStatus && matchesSport && matchesQuery;
    });
  }, [activities, query, status, sport]);

  function toggleFeatured(id: string) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, featured: !a.featured } : a)),
    );
  }

  function cancelActivity(id: string) {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a)),
    );
  }

  return (
    <>
      <PageHeader
        title="Activities"
        subtitle="Every activity created on MatchUp — feature the best ones or pull down ones that break the rules."
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <FilterPills options={STATUS_FILTERS} value={status} onChange={setStatus} />
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="rounded-input border border-ink-300 bg-white px-3 py-1.5 text-sm text-ink-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {sportOptions.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All sports' : s}
              </option>
            ))}
          </select>
        </div>
        <SearchInput
          placeholder="Search title, host, location…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="lg:w-72"
        />
      </div>

      <TableWrapper>
        <table className="min-w-full divide-y divide-ink-200">
          <thead className="bg-ink-50">
            <tr>
              <Th>Activity</Th>
              <Th>Sport</Th>
              <Th>Host</Th>
              <Th>When &amp; where</Th>
              <Th>Joined</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white">
            {filtered.map((a) => (
              <tr key={a.id} className="hover:bg-ink-50">
                <Td>
                  <p className="font-medium text-ink-900">{a.title}</p>
                  {a.featured ? <Badge tone="brand" className="mt-1">Featured</Badge> : null}
                </Td>
                <Td>
                  <Badge tone="accent">{a.sport}</Badge>
                </Td>
                <Td>{a.hostName}</Td>
                <Td>
                  <p className="flex items-center gap-1 text-ink-700">
                    <IconClock className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                    {formatDateTime(a.startAt)}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-500">
                    <IconMapPin className="h-3.5 w-3.5 shrink-0 text-ink-400" />
                    {a.location}
                  </p>
                </Td>
                <Td>
                  <span className="font-medium text-ink-900">{a.joined}</span>
                  <span className="text-ink-400">/{a.capacity}</span>
                </Td>
                <Td>
                  <Badge tone={STATUS_TONE[a.status]}>{a.status}</Badge>
                </Td>
                <Td>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="secondary" onClick={() => toggleFeatured(a.id)}>
                      {a.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-danger-600 hover:bg-danger-50"
                      disabled={a.status === 'cancelled'}
                      onClick={() => cancelActivity(a.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <EmptyState
            title="No activities match those filters"
            description="Try a different sport, status, or search term."
          />
        ) : null}
      </TableWrapper>
    </>
  );
}
