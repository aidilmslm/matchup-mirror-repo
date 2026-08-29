import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { IconFlag, IconGrid, IconMegaphone, IconUsers, IconZap } from '../ui/icons';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: IconGrid, end: true },
  { to: '/members', label: 'Members', icon: IconUsers, end: false },
  { to: '/activities', label: 'Activities', icon: IconZap, end: false },
  { to: '/reports', label: 'Reports', icon: IconFlag, end: false },
  { to: '/broadcasts', label: 'Broadcasts', icon: IconMegaphone, end: false },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden w-sidebar shrink-0 border-r border-ink-200 bg-white md:flex md:flex-col">
      <div className="flex h-topbar items-center gap-2.5 border-b border-ink-200 px-6">
        <img src="/logo-badge.png" alt="" className="h-7 w-7 rounded-lg" />
        <div className="leading-tight">
          <span className="block font-heading text-base font-extrabold tracking-tight text-brand-600">
            MatchUp
          </span>
          <span className="block text-[11px] font-medium uppercase tracking-wide text-ink-400">
            Admin
          </span>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 rounded-md border-l-2 px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'border-accent-500 bg-brand-50 text-brand-700'
                  : 'border-transparent text-ink-600 hover:bg-ink-100 hover:text-ink-900',
              )
            }
          >
            <item.icon className="shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-ink-200 px-4 py-4">
        <p className="text-xs text-ink-400">MatchUp Admin &middot; v0.1</p>
      </div>
    </aside>
  );
}
