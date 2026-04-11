import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Loader from '@ds/components/Loader';
import EmptyState from '@ds/components/EmptyState';
import PageHeader from '@ds/components/PageHeader';
import Button from '@ds/components/Button';
import Input from '@ds/components/Input';
import Modal from '@ds/components/Modal';
import Select from '@ds/components/Select';
import StatusBadge from '@ds/components/StatusBadge';
import Textarea from '@ds/components/Textarea';
import EventManagementCard from '@club/components/EventManagementCard';
import { useDiscoveryEvents } from '@club/hooks/useDiscovery';
import { useEvents } from '@club/hooks/useEvents';
import { createEvent } from '@club/api/events.api';
import { selectUser } from '@store/authSlice';
import { usePermission } from '@hooks/usePermission';
import { formatDate } from '@dashboard/utils/dashboardFormatters';

const EVENT_CATEGORIES = [
  'WORKSHOP',
  'SEMINAR',
  'HACKATHON',
  'COMPETITION',
  'CULTURAL',
  'GUEST_LECTURE',
  'FDP',
  'WEBINAR',
  'INDUSTRIAL_VISIT',
  'OTHER',
];

const createSchema = z.object({
  category: z.enum(EVENT_CATEGORIES),
  description: z.string().min(10).max(2000),
  endDate: z.string().min(1, 'Required'),
  isPublic: z.boolean().optional(),
  objective: z.string().min(10).max(1000),
  organizingClubId: z.string().min(1, 'Select a club'),
  startDate: z.string().min(1, 'Required'),
  title: z.string().min(3).max(200),
  venue: z.string().min(2).max(200),
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate'],
});

function PublicEventCard({ event }) {
  return (
    <article className="card-surface overflow-hidden">
      <div
        className="h-40 w-full"
        style={{
          background: event.attachments?.poster
            ? `url(${event.attachments.poster}) center/cover no-repeat`
            : 'linear-gradient(135deg, var(--color-brand-soft) 0%, var(--color-surface-soft) 100%)',
        }}
      />
      <div className="p-4">
        <StatusBadge status={event.status} type="event" />
        <h3 className="mt-2 line-clamp-1 text-base font-semibold text-[var(--color-text-primary)]">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {formatDate(event.startDate)}{event.venue ? ` - ${event.venue}` : ''}
        </p>
        {event.clubName ? (
          <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{event.clubName}</p>
        ) : null}
      </div>
    </article>
  );
}

function EventsPage() {
  const dashboard = useOutletContext() ?? {};
  const user = useSelector(selectUser);
  const { can } = usePermission(dashboard.roles ?? []);
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');

  const canManageEvents = can('CREATE_EVENT') || can('MANAGE_MEMBERS');
  const publicEvents = useDiscoveryEvents(50);
  const myEvents = useEvents({
    enabled: canManageEvents,
    limit: 50,
    userId: user?.id,
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: { category: 'WORKSHOP', isPublic: true },
    resolver: zodResolver(createSchema),
  });

  const onCreateEvent = async (values) => {
    setIsCreating(true);
    try {
      await createEvent(values);
      queryClient.invalidateQueries({ queryKey: ['club-service', 'events'] });
      queryClient.invalidateQueries({ queryKey: ['club-service', 'discover', 'events'] });
      toast.success('Event created.');
      setModalOpen(false);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message ?? 'Could not create event.');
    } finally {
      setIsCreating(false);
    }
  };

  const filterEvent = (event) =>
    !search.trim() || event.title?.toLowerCase().includes(search.toLowerCase());

  const myEventList = (myEvents.data?.createdEvents ?? []).filter(filterEvent);
  const publicList = (publicEvents.data ?? []).filter(filterEvent);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader title="Events" description="Browse and manage events across all clubs." />
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <input
            className="min-h-10 flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] px-4 py-2 text-sm text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-brand)] sm:w-48 sm:flex-none"
            placeholder="Search events..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {can('CREATE_EVENT') ? (
            <Button onClick={() => setModalOpen(true)} size="md">
              + Create Event
            </Button>
          ) : null}
        </div>
      </div>

      {canManageEvents ? (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
            My Events
          </h2>
          {myEvents.isLoading ? (
            <div className="flex justify-center py-8"><Loader size="lg" /></div>
          ) : myEventList.length === 0 ? (
            <EmptyState
              icon="events"
              title="No events yet"
              description={can('CREATE_EVENT') ? 'Create your first event using the button above.' : 'No events found.'}
            />
          ) : (
            <div className="space-y-4">
              {myEventList.map((event) => (
                <EventManagementCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section>
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          Upcoming Events
        </h2>
        {publicEvents.isLoading ? (
          <div className="flex justify-center py-8"><Loader size="lg" /></div>
        ) : publicList.length === 0 ? (
          <EmptyState
            icon="events"
            title="No upcoming events"
            description="Approved events will appear here."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {publicList.map((event) => <PublicEventCard key={event._id} event={event} />)}
          </div>
        )}
      </section>

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); reset(); }} title="Create Event">
        <form
          onSubmit={handleSubmit(onCreateEvent)}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-1"
        >
          <Input label="Event Title" error={errors.title?.message} {...register('title')} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="Category" error={errors.category?.message} {...register('category')}>
              {EVENT_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category.replace(/_/g, ' ')}</option>
              ))}
            </Select>
            <Select
              label="Organising Club"
              error={errors.organizingClubId?.message}
              {...register('organizingClubId')}
            >
              <option value="">Select a club</option>
              {(dashboard.managedClubs ?? []).map((role) => (
                <option key={String(role.scopeId)} value={String(role.scopeId)}>
                  {role.scope?.name ?? 'Club'}
                </option>
              ))}
            </Select>
          </div>
          <Input label="Venue" error={errors.venue?.message} {...register('venue')} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Start Date"
              type="datetime-local"
              error={errors.startDate?.message}
              {...register('startDate')}
            />
            <Input
              label="End Date"
              type="datetime-local"
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>
          <Textarea
            label="Description"
            rows={3}
            error={errors.description?.message}
            {...register('description')}
          />
          <Textarea
            label="Objective"
            rows={2}
            error={errors.objective?.message}
            {...register('objective')}
          />
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="h-4 w-4 accent-[var(--color-brand)]"
              {...register('isPublic')}
            />
            <span className="text-[var(--color-text-primary)]">Make this event public</span>
          </label>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => { setModalOpen(false); reset(); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isCreating}>Create Event</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EventsPage;
