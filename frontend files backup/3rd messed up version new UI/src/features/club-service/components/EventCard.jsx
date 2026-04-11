import { Link } from 'react-router-dom';
import StatusBadge from '@ds/components/StatusBadge';
import { formatDate } from '@dashboard/utils/dashboardFormatters';

function EventCard({ event }) {
  return (
    <article className="card-surface-muted flex items-center justify-between gap-4 p-4">
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          <Link className="hover:text-[var(--color-brand)]" to={`/dashboard/events/${event._id}`}>
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {event.clubName || event.organizerName || 'Club event'} - {formatDate(event.startDate)}
        </p>
      </div>
      <StatusBadge status={event.status || 'DRAFT'} type="event" />
    </article>
  );
}

export default EventCard;
