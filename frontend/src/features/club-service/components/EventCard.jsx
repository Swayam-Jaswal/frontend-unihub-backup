import { formatDate, formatStatusLabel } from '@dashboard/utils/dashboardFormatters';

function EventCard({ event }) {
  return (
    <article className="card-surface-muted flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {event.clubName || event.organizerName || 'Club event'} - {formatDate(event.startDate)}
        </p>
      </div>

      <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold text-[var(--color-brand)]">
        {formatStatusLabel(event.status || 'UPCOMING')}
      </span>
    </article>
  );
}

export default EventCard;
