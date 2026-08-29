import { useState, type FormEvent } from 'react';
import { Button, Input } from '../../components/ui';

export function LoginPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Auth wiring lands in the MVP phase — this just simulates a request.
    window.setTimeout(() => setSubmitting(false), 600);
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-brand-600 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <img src="/logo-badge.png" alt="" className="h-14 w-14 rounded-2xl shadow-floating" />
          <h1 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-white">
            MatchUp Admin
          </h1>
          <p className="mt-1 text-sm text-brand-100">Sign in to manage members and activities.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-card bg-white p-6 shadow-floating">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-700">Email</label>
              <Input type="email" required placeholder="admin@matchup.app" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-ink-700">Password</label>
              <Input type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-ink-400">
            Auth wiring lands in the MVP phase — this form doesn't call the API yet.
          </p>
        </form>
      </div>
    </div>
  );
}
