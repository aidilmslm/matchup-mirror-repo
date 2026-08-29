import { Link } from 'react-router-dom';
import { Avatar, SearchInput } from '../ui';
import { IconBell } from '../ui/icons';
import { useAuth } from '../../hooks/useAuth';

export function Topbar() {
  const { user } = useAuth();
  const displayName = user?.email ?? 'Admin User';

  return (
    <header className="flex h-topbar items-center justify-between gap-4 border-b border-ink-200 bg-white px-6">
      <SearchInput placeholder="Search members, activities…" className="max-w-sm" />
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-md p-2 text-ink-500 hover:bg-ink-100 hover:text-ink-900"
          aria-label="Notifications"
        >
          <IconBell />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2.5">
          <Avatar name={displayName} size="sm" />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-ink-900">{displayName}</p>
            <Link to="/login" className="text-xs text-ink-500 hover:text-brand-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
