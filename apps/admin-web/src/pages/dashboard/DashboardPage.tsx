import { Link } from 'react-router-dom';
import { Avatar, Badge, Card, PageHeader, StatCard } from '../../components/ui';
import { IconFlag } from '../../components/ui/icons';
import { useApi } from '../../hooks/useApi';
import { ACTIVITIES, DASHBOARD_STATS, MEMBERS } from '../../mocks/adminData';

interface HealthResponse {
  status: string;
  service: string;
}

function ApiStatusPill() {
  const { data, loading, error } = useApi<HealthResponse>('/health');
  const ok = !loading && !error && data?.status === 'ok';
  return (
    <Badge tone={loading ? 'neutral' : ok ? 'success' : 'danger'}>
      <span
        className={`h-1.5 w-1.5 rounded-full ${loading ? 'bg-ink-400' : ok ? 'bg-success-600' : 'bg-danger-600'}`}
      />
      API {loading ? 'checking…' : ok ? 'online' : 'offline'}
    </Badge>
  );
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-NZ', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function DashboardPage() {
  const recentMembers = [...MEMBERS]
    .sort((a, b) => (a.joinedAt < b.joinedAt ? 1 : -1))
    .slice(0, 5);
  const upcomingActivities = [...ACTIVITIES]
    .filter((a) => a.status === 'open' || a.status === 'full')
    .sort((a, b) => (a.startAt < b.startAt ? -1 : 1))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="What's happening on MatchUp right now."
        actions={<ApiStatusPill />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total members" value={DASHBOARD_STATS.totalMembers.toLocaleString()} hint="Across all sports" />
        <StatCard label="Live activities" value={DASHBOARD_STATS.liveActivities.toLocaleString()} hint="Open or full right now" />
        <StatCard label="Matches this week" value={DASHBOARD_STATS.matchesThisWeek.toLocaleString()} hint="Mutual joins & swipes" />
        <StatCard
          label="Pending reports"
          value={DASHBOARD_STATS.pendingReports}
          hint={
            <Link to="/reports" className="font-medium text-brand-600 hover:underline">
              Review queue &rarr;
            </Link>
          }
          tone={DASHBOARD_STATS.pendingReports > 0 ? 'accent' : 'neutral'}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
            <h2 className="font-heading text-sm font-semibold text-ink-900">Recent signups</h2>
            <Link to="/members" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-ink-200">
            {recentMembers.map((m) => (
              <li key={m.id} className="flex items-center gap-3 px-4 py-3">
                <Avatar name={m.name} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">{m.name}</p>
                  <p className="truncate text-xs text-ink-500">{m.location}</p>
                </div>
                <span className="shrink-0 text-xs text-ink-400">{formatDate(m.joinedAt)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
            <h2 className="font-heading text-sm font-semibold text-ink-900">Upcoming activities</h2>
            <Link to="/activities" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-ink-200">
            {upcomingActivities.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3">
                <Badge tone="accent">{a.sport}</Badge>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">{a.title}</p>
                  <p className="truncate text-xs text-ink-500">{a.location}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-ink-500">{formatDateTime(a.startAt)}</p>
                  <p className="text-xs font-medium text-ink-700">{a.joined}/{a.capacity} joined</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {DASHBOARD_STATS.pendingReports > 0 ? (
        <Card className="mt-4 flex items-center gap-3 border-warning-500/30 bg-warning-50">
          <IconFlag className="shrink-0 text-warning-600" />
          <p className="flex-1 text-sm text-ink-700">
            <span className="font-semibold text-ink-900">{DASHBOARD_STATS.pendingReports} reports</span>{' '}
            are waiting for review.
          </p>
          <Link
            to="/reports"
            className="shrink-0 text-sm font-medium text-brand-600 hover:underline"
          >
            Open moderation queue
          </Link>
        </Card>
      ) : null}
    </>
  );
}
