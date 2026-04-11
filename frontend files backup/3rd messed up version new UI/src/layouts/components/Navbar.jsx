import { useEffect, useRef, useState } from 'react';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import ListRow from '@ds/components/ListRow';
import {
  getGreetingLabel,
  getUserDisplayName,
  getUserInitials,
} from '@dashboard/utils/userPresentation';
import { logout } from '@auth/logout';
import { useNotifications } from '@hooks/useNotifications';
import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';

function Navbar({ dashboard, isDesktop, onMenuToggle }) {
  const user = dashboard?.user;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const notifications = useNotifications(dashboard);
  const notificationCount = Math.min(notifications.count, 9);
  const activeRole = dashboard?.roles?.find((role) => role.status !== 'REMOVED');
  const roleLabel = activeRole
    ? formatCanonicalRole(activeRole.canonicalRole)
    : user?.userType?.replace(/_/g, ' ') ?? 'Member';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[hsl(var(--border)/0.55)] bg-[hsl(var(--background)/0.72)] backdrop-blur-2xl">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {!isDesktop ? (
            <button
              aria-label="Open sidebar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[hsl(var(--border)/0.72)] bg-[hsl(var(--card)/0.72)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              onClick={onMenuToggle}
              type="button"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={2} />
            </button>
          ) : null}

          {!isDesktop ? (
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] bg-[var(--gradient-brand-mark)] text-base font-semibold text-[var(--color-text-on-brand)] shadow-[var(--shadow-brand-mark)]">
                U
              </div>
              <p className="truncate text-[1.35rem] font-semibold leading-none text-[var(--color-text-primary)]">
                UniHub
              </p>
            </div>
          ) : (
            <div className="min-w-0">
              <p className="truncate text-[1.05rem] font-semibold text-[var(--color-text-primary)] sm:text-[1.1rem]">
                {getGreetingLabel()}, {getUserDisplayName(user)}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[hsl(var(--primary)/0.25)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.12),hsl(var(--secondary)/0.12))] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-primary)]">
                  Active
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">{roleLabel}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="relative" ref={notificationsRef}>
            <button
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border)/0.72)] bg-[hsl(var(--card)/0.72)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              type="button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((current) => !current)}
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
              {notificationCount > 0 ? (
                <span className="absolute right-2 top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-semibold text-[var(--color-text-inverse)]">
                  {notificationCount}
                </span>
              ) : null}
            </button>

            {notificationsOpen ? (
              <div className="absolute right-0 top-12 z-50 w-[min(24rem,calc(100vw-1.5rem))] rounded-[calc(var(--radius)+0.5rem)] border border-[hsl(var(--border)/0.72)] bg-[linear-gradient(160deg,hsl(var(--card)/0.96),hsl(var(--background-elevated)/0.92))] py-1 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                <div className="border-b border-[hsl(var(--border)/0.55)] px-4 py-3">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">Notifications</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                    Recent activity relevant to you
                  </p>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.items.length ? (
                    notifications.items.map((item) => (
                      <ListRow
                        key={item.id}
                        badge={item.badge}
                        href={item.href}
                        onClick={() => setNotificationsOpen(false)}
                        subtitle={item.subtitle}
                        title={item.title}
                      />
                    ))
                  ) : (
                    <div className="px-3 py-6 text-center text-sm text-[var(--color-text-secondary)]">
                      You&apos;re all caught up.
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              aria-label="User menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border)/0.65)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.22),hsl(var(--secondary)/0.2))] text-sm font-semibold text-[var(--color-text-on-brand)] shadow-[var(--shadow-user-avatar)] transition-opacity hover:opacity-85"
              onClick={() => setDropdownOpen((current) => !current)}
              type="button"
            >
              {getUserInitials(user)}
            </button>

            {dropdownOpen ? (
              <div className="absolute right-0 top-12 z-50 w-56 rounded-[calc(var(--radius)+0.5rem)] border border-[hsl(var(--border)/0.72)] bg-[linear-gradient(160deg,hsl(var(--card)/0.96),hsl(var(--background-elevated)/0.92))] py-1 shadow-[var(--shadow-card)] backdrop-blur-2xl">
                <div className="border-b border-[hsl(var(--border)/0.55)] px-4 py-3">
                  <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
                    {getUserDisplayName(user)}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[var(--color-text-secondary)]">
                    {user?.email}
                  </p>
                </div>

                <Link
                  to="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[hsl(var(--muted)/0.55)] hover:text-[var(--color-text-primary)]"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>

                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[hsl(var(--muted)/0.55)] hover:text-[var(--color-text-primary)]"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>

                <div className="border-t border-[hsl(var(--border)/0.55)] pt-1">
                  <button
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-danger)] transition-colors hover:bg-[var(--status-event-rejected-bg)]"
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    type="button"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
