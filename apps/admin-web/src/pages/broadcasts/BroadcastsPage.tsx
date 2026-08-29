import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  PageHeader,
  Select,
  Td,
  Th,
  TableWrapper,
  Textarea,
} from '../../components/ui';
import { IconMegaphone } from '../../components/ui/icons';
import { BROADCASTS, type Broadcast } from '../../mocks/adminData';

const AUDIENCES = [
  { value: 'All members', recipients: 4213 },
  { value: 'Basketball players', recipients: 812 },
  { value: 'Tennis players', recipients: 540 },
  { value: 'Volleyball players', recipients: 398 },
  { value: 'Auckland CBD', recipients: 356 },
];

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-NZ', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function BroadcastsPage() {
  const [history, setHistory] = useState<Broadcast[]>(BROADCASTS);
  const [audience, setAudience] = useState(AUDIENCES[0]!.value);
  const [message, setMessage] = useState('');

  function handleSend() {
    if (!message.trim()) return;
    const chosen = AUDIENCES.find((a) => a.value === audience) ?? AUDIENCES[0]!;
    const next: Broadcast = {
      id: `b${Date.now()}`,
      audience,
      message: message.trim(),
      sentAt: new Date().toISOString(),
      recipients: chosen.recipients,
      status: 'sent',
    };
    setHistory((prev) => [next, ...prev]);
    setMessage('');
  }

  return (
    <>
      <PageHeader
        title="Broadcasts"
        subtitle="Send an announcement or push notification to a segment of MatchUp members."
      />

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr]">
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-700">Audience</label>
            <Select value={audience} onChange={(e) => setAudience(e.target.value)}>
              {AUDIENCES.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.value}
                </option>
              ))}
            </Select>
            <p className="mt-1.5 text-xs text-ink-500">
              ~{(AUDIENCES.find((a) => a.value === audience)?.recipients ?? 0).toLocaleString()} recipients
            </p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ink-700">Message</label>
            <Textarea
              placeholder="Write a broadcast message to send to this audience…"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <span className="mr-auto text-xs text-ink-400">{message.length}/280 characters</span>
          <Button variant="accent" onClick={handleSend} disabled={!message.trim()}>
            <IconMegaphone className="h-4 w-4" />
            Send broadcast
          </Button>
        </div>
      </Card>

      <h2 className="mb-3 mt-8 font-heading text-sm font-semibold text-ink-900">History</h2>
      <TableWrapper>
        <table className="min-w-full divide-y divide-ink-200">
          <thead className="bg-ink-50">
            <tr>
              <Th>Message</Th>
              <Th>Audience</Th>
              <Th>Recipients</Th>
              <Th>Sent</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-200 bg-white">
            {history.map((b) => (
              <tr key={b.id} className="hover:bg-ink-50">
                <Td className="max-w-md">
                  <p className="line-clamp-2 text-ink-900">{b.message}</p>
                </Td>
                <Td>{b.audience}</Td>
                <Td>{b.recipients.toLocaleString()}</Td>
                <Td>{formatDateTime(b.sentAt)}</Td>
                <Td>
                  <Badge tone={b.status === 'sent' ? 'success' : 'warning'}>{b.status}</Badge>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
}
