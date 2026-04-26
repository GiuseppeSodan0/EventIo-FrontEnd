import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Service/ticket-service';
import { TicketDto } from '../../Dto/TicketDto';
import { EventService } from '../../Service/event-service';
import { EventDto } from '../../Dto/EventDto';
import { catchError, finalize, forkJoin, map, of, switchMap } from 'rxjs';

interface EventTicketOverview {
  id: number;
  name: string;
  location: string;
  type: string;
  date: number;
  soldTickets: number;
  availableTickets: number;
}

@Component({
  selector: 'app-admin-ticket-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-ticket-component.html',
  styleUrl: './admin-ticket-component.css',
})
export class AdminTicketComponent {

  private ticketService = inject(TicketService);
  private eventService = inject(EventService);

  eventsOverview = signal<EventTicketOverview[]>([]);
  selectedEvent = signal<EventTicketOverview | null>(null);
  eventTickets = signal<TicketDto[]>([]);

  loadingEvents = signal(false);
  loadingTickets = signal(false);
  errorMessage = signal('');

  ngOnInit() {
    this.loadEventsOverview();
  }

  loadEventsOverview() {
    this.loadingEvents.set(true);
    this.errorMessage.set('');

    this.eventService.getAllEvents()
      .pipe(
        switchMap((events) => {
          const validEvents = events
            .map((event) => ({ event, id: this.extractEventId(event) }))
            .filter((entry): entry is { event: EventDto; id: number } => entry.id !== null);

          if (validEvents.length === 0) {
            return of([] as EventTicketOverview[]);
          }

          return forkJoin(
            validEvents.map(({ event, id }) =>
              forkJoin({
                soldTickets: this.eventService
                  .getSelledTicketsByEventId(id)
                  .pipe(catchError(() => of(Number(event.selledTickets || 0)))),
                availableTickets: this.eventService
                  .getAvailableTicketsByEventId(id)
                  .pipe(
                    catchError(() =>
                      of(Math.max(Number(event.maxTickets || 0) - Number(event.selledTickets || 0), 0))
                    )
                  ),
              }).pipe(
                map((stats) => ({
                  id,
                  name: event.name,
                  location: event.location,
                  type: event.type,
                  date: event.date,
                  soldTickets: Number(stats.soldTickets || 0),
                  availableTickets: Number(stats.availableTickets || 0),
                }))
              )
            )
          );
        }),
        finalize(() => this.loadingEvents.set(false))
      )
      .subscribe({
        next: (overview) => this.eventsOverview.set(overview),
        error: () => this.errorMessage.set('Errore durante il caricamento degli eventi.'),
      });
  }

  openEventTickets(event: EventTicketOverview) {
    this.selectedEvent.set(event);
    this.loadTicketsForEvent(event.id);
  }

  backToEvents() {
    this.selectedEvent.set(null);
    this.eventTickets.set([]);
  }

  private loadTicketsForEvent(eventId: number) {
    this.loadingTickets.set(true);
    this.errorMessage.set('');

    this.ticketService.findByEvent(eventId)
      .pipe(finalize(() => this.loadingTickets.set(false)))
      .subscribe({
        next: (tickets) => this.eventTickets.set(tickets),
        error: () => this.errorMessage.set('Errore durante il caricamento dei biglietti evento.'),
      });
  }

  private extractEventId(event: EventDto): number | null {
    if (typeof event.id === 'number' && Number.isFinite(event.id)) {
      return event.id;
    }

    const maybeEvent = event as unknown as Record<string, unknown>;
    const rawId = maybeEvent['eventId'];

    if (typeof rawId === 'number' && Number.isFinite(rawId)) {
      return rawId;
    }

    if (typeof rawId === 'string') {
      const parsed = Number(rawId);
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  }
}