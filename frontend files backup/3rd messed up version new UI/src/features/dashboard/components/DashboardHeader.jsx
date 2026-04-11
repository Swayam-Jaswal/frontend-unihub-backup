import { formatCanonicalRole } from '@dashboard/utils/dashboardAccess';
import { getUserDisplayName } from '@dashboard/utils/userPresentation';

function getRoleLabel(role) {
  if (role === 'ADMIN') return 'Administrator';
  if (role === 'FACULTY') return 'Faculty Member';
  if (role === 'STUDENT') return 'Campus Member';
  return formatCanonicalRole(role);
}

function DashboardHeader({ role, roles = [], user }) {
  return (
    <section className="card-surface page-enter flex flex-wrap items-start justify-between gap-6 p-6">
      <div className="max-w-3xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.28em] text-[var(--color-text-secondary)]">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          Welcome back,{' '}
          <span className="gradient-brand-text">
            {getUserDisplayName(user)}
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          Viewing as {getRoleLabel(role)}. Here is your overview.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {roles.slice(0, 4).map((item) => (
          <span
            key={item._id}
            className="rounded-full border border-[hsl(var(--primary)/0.24)] bg-[linear-gradient(135deg,hsl(var(--primary)/0.12),hsl(var(--secondary)/0.12))] px-3 py-1.5 text-sm font-medium text-[var(--color-text-primary)]"
          >
            {formatCanonicalRole(item.canonicalRole)}
          </span>
        ))}
      </div>
    </section>
  );
}

export default DashboardHeader;
