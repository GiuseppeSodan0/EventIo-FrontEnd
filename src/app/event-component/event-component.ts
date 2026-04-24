import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment-component/payment-component';
import { AuthService } from '../Service/auth-service';

@Component({
  selector: 'app-event-component',
  standalone: true,
  imports: [CommonModule, PaymentComponent],
  templateUrl: './event-component.html',
  styleUrl: './event-component.css',
})
export class EventComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  // =========================
  // SIGNAL STATE
  // =========================
  baseList = signal<EventDto[]>([]);
  events = signal<EventDto[]>([]);

  currentPage = signal(1);
  pageSize = 4;

  // =========================
  // UI STATE
  // =========================
  selectedEvent: EventDto | null = null;

  // =========================
  // POPUP STATE
  // =========================
  popupStep = 1;
  ticketQty = 1;

  // =========================
  // STATS STATE
  // =========================
  totalSelledTickets = 0;
  totalAvailableTickets = 0;

  // =========================
  // INIT
  // =========================
  ngOnInit(): void {
    this.loadAllEvents();
  }

  // =========================
  // LOAD
  // =========================
  loadAllEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data: any) => {
        const parsed = typeof data === 'string' ? JSON.parse(data) : data;

        this.baseList.set(parsed);
        this.events.set(parsed);

        const selectId = this.route.snapshot.queryParamMap.get('selectEvent');
        if (selectId) {
          const target = (parsed as EventDto[]).find(
            (e) => String(e.id) === selectId
          );
          if (target) {
            this.selectEvent(target);
          }
        }
      },
      error: (err) => {
        console.error('Errore nel caricamento eventi', err);
      }
    });
  }

  // =========================
  // FILTRI
  // =========================
  filtra(
  name: string,
  location: string,
  description: string,
  start: string,
  end: string
) {
  const n = name?.trim() || undefined;
  const d = description?.trim() || undefined;
  const l = location?.trim() || undefined;

  const startIso = start ? `${start} 00:00:00` : undefined;
  const endIso = end ? `${end} 23:59:59` : undefined;

  // 🔹 conteggio filtri reali
  const filters = [n, d, l, start, end].filter(v => v?.trim());
  const hasMultipleFilters = filters.length > 1;

  // =========================
  // 🔥 CASO AVANZATO (PRIMA DI TUTTO)
  // =========================
  if (hasMultipleFilters) {
    this.eventService.advancedSearch(
      n,
      d,
      l,
      startIso,
      endIso
    ).subscribe({
      next: (res) => {
        this.events.set(res);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // =========================
  // CASI SINGOLI
  // =========================

  // DATE RANGE
  if (startIso && endIso) {
    this.eventService.findByDataBetween(startIso, endIso).subscribe({
      next: (res: any) => {
        this.events.set(Array.isArray(res) ? res : [res]);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // SOLO START
  if (startIso) {
    this.eventService.findByDataAfter(startIso).subscribe({
      next: (res: any) => {
        this.events.set(Array.isArray(res) ? res : [res]);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // SOLO END
  if (endIso) {
    this.eventService.findByDataBefore(endIso).subscribe({
      next: (res: any) => {
        this.events.set(Array.isArray(res) ? res : [res]);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // SOLO NOME
  if (n) {
    this.eventService.findByName(n).subscribe({
      next: (res) => {
        this.events.set(res);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // SOLO DESCRIZIONE
  if (d) {
    this.eventService.findByDescription(d).subscribe({
      next: (res) => {
        this.events.set(res);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // SOLO LUOGO
  if (l) {
    this.eventService.findByLocation(l).subscribe({
      next: (res) => {
        this.events.set(res);
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // =========================
  // RESET
  // =========================
  this.events.set(this.baseList());
  this.currentPage.set(1);
}

  // =========================
  // RESET
  // =========================
  reset(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    locationInput: HTMLInputElement,
    startDate: HTMLInputElement,
    endDate: HTMLInputElement
  ) {
    this.events.set(this.baseList());

    nameInput.value = '';
    descriptionInput.value = '';
    locationInput.value = '';
    startDate.value = '';
    endDate.value = '';

    this.currentPage.set(1);
  }

  // =========================
  // SELECT EVENT
  // =========================
  selectEvent(e: EventDto) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.selectedEvent = e;
    this.popupStep = 1;
    this.ticketQty = 1;
  }

  closePopup() {
    this.selectedEvent = null;
    this.popupStep = 1;
    this.ticketQty = 1;
  }

  incTickets() {
    if (!this.selectedEvent) return;
    const available = this.selectedEvent.maxTickets - this.selectedEvent.selledTickets;
    if (this.ticketQty < available) this.ticketQty++;
  }

  decTickets() {
    if (this.ticketQty > 1) this.ticketQty--;
  }

  confirmSelection() {
    if (this.popupStep < 3) {
      this.popupStep++;
    } else {
      this.closePopup();
    }
  }

  get pagedEvents() {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.events().slice(start, end);
  }

  nextPage() {
    const maxPage = Math.ceil(this.events().length / this.pageSize);
    if (this.currentPage() < maxPage) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder.png';
    img.alt = 'Immagine non disponibile';
  }

  // =========================
  // LOAD TICKET STATS
  // =========================
  loadTicketStats(eventId: number): void {
    this.eventService.getSelledTicketsByEventId(eventId).subscribe({
      next: (value) => { this.totalSelledTickets = value; },
      error: (err) => console.error(err)
    });

    this.eventService.getAvailableTicketsByEventId(eventId).subscribe({
      next: (value) => { this.totalAvailableTickets = value; },
      error: (err) => console.error(err)
    });
  }
}