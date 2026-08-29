import { useMemo, useState } from 'react';
import {
  Avatar,
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
import { IconShieldCheck } from '../../components/ui/icons';
import { MEMBERS, type Member, type MemberStatus } from '../../mocks/adminData';

const STATUS_TONE: Record<MemberStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  active: 'success',
  pending: 'warning',
  suspended: 'danger',
  banned: 'danger',
};

const FILTERS: { value: MemberStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'banned', label: 'Banned' },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function MembersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<MemberStatus | 'all'>('all');
  const [selected, setSelected] = useState<Member | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      const matchesStatus = status === 'all' || m.status === status;
      const matchesQuery =
        !q || m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  return (
    <>
      <PageHeader
        title="Members"
        subtitle={`${MEMBERS.length} members shown of the mock dataset — swap in the real list endpoint when it lands.`}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterPills options={FILTERS} value={status} onChange={setStatus} />
        <SearchInput
          placeholder="Search name or email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="sm:w-72"
        />
      </div>

      <TableWrapper>
        <table className="min-w-full divide-y divide-ink-200">
          <thead className="bg-ink-50">
            <tr>
              <Th>Member</Th>
              <Th>Sports</Th>
              <Th>Status</Th>
              <Th>Joined</Th>
              <Th>Activities</Th>
              <Th>Reports</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white">
            {filtered.map((m) => (
              <tr
                key={m.id}
                onClick={() => setSelected(m)}
                className="cursor-pointer hover:bg-ink-50"
              >
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size="sm" />
                    <div className="min-w-0">
                      <p className="flex items-center gap-1 truncate font-medium text-ink-900">
                        {m.name}
                        {m.verified ? (
                          <IconShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                        ) : null}
                      </p>
                      <p className="truncate text-xs text-ink-500">{m.email}</p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <div className="flex flex-wrap gap-1">
                    {m.sports.map((s) => (
                      <Badge key={s} tone="accent">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </Td>
                <Td>
                  <Badge tone={STATUS_TONE[m.status]}>{m.status}</Badge>
                </Td>
                <Td>{formatDate(m.joinedAt)}</Td>
                <Td>{m.activitiesJoined}</Td>
                <Td>
                  {m.reportsAgainst > 0 ? (
                    <span className="font-medium text-danger-600">{m.reportsAgainst}</span>
                  ) : (
                    <span className="text-ink-400">0</span>
                  )}
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <EmptyState
            title="No members match those filters"
            description="Try a different search term or clear the status filter."
          />
        ) : null}
      </TableWrapper>

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
        subtitle={selected?.email}
        footer={
          selected ? (
            <div className="flex gap-2">
              {selected.status === 'suspended' || selected.status === 'banned' ? (
                <Button variant="primary" className="flex-1">
                  Reinstate member
                </Button>
              ) : (
                <Button variant="danger" className="flex-1">
                  Suspend member
                </Button>
              )}
              {!selected.verified ? (
                <Button variant="secondary" className="flex-1">
                  Verify identity
                </Button>
              ) : null}
            </div>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div>
                <p className="font-heading text-lg font-bold text-ink-900">{selected.name}</p>
                <p className="text-sm text-ink-500">{selected.location}</p>
              </div>
              <Badge tone={STATUS_TONE[selected.status]} className="ml-auto">
                {selected.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-input border border-ink-200 p-3">
                <p className="text-xs text-ink-500">Activities joined</p>
                <p className="mt-1 font-heading text-xl font-bold text-ink-900">
                  {selected.activitiesJoined}
                </p>
              </div>
              <div className="rounded-input border border-ink-200 p-3">
                <p className="text-xs text-ink-500">Reports against</p>
                <p
                  className={`mt-1 font-heading text-xl font-bold ${selected.reportsAgainst > 0 ? 'text-danger-600' : 'text-ink-900'}`}
                >
                  {selected.reportsAgainst}
                </p>
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Preferred sports
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selected.sports.map((s) => (
                  <Badge key={s} tone="accent">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-500">
                Account
              </p>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-500">Email</dt>
                  <dd className="text-ink-900">{selected.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Joined</dt>
                  <dd className="text-ink-900">{formatDate(selected.joinedAt)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">Verified</dt>
                  <dd className="text-ink-900">{selected.verified ? 'Yes' : 'Not yet'}</dd>
                </div>
              </dl>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
