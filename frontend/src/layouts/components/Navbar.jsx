import { Bell, Menu } from 'lucide-react';
import {
  getGreetingLabel,
  getUserDisplayName,
  getUserInitials,
} from '@dashboard/utils/userPresentation';

function Navbar({ dashboard, isDesktop, onMenuToggle }) {
  const user = dashboard?.user;
  const notificationCount = Math.min(dashboard?.approvalItems?.length ?? 0, 9);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface-dark)_80%,var(--color-background)_20%)]">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          {!isDesktop ? (
            <button
              aria-label="Open sidebar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
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
            <p className="truncate text-[1.05rem] font-semibold text-[var(--color-text-primary)] sm:text-[1.1rem]">
              {getGreetingLabel()}, {getUserDisplayName(user)}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
            type="button"
          >
            <Bell className="h-[18px] w-[18px]" strokeWidth={1.9} />
            <span className="absolute right-2 top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-brand)] px-1 text-[10px] font-semibold text-[var(--color-text-inverse)]">
              {notificationCount}
            </span>
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand)_18%,transparent)] text-sm font-semibold text-[var(--color-brand)]">
            {getUserInitials(user)}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
