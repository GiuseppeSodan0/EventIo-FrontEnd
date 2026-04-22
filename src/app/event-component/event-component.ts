import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from '../payment-component/payment-component';

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
  ) { }

  // =========================
  // SIGNAL STATE
  // =========================
  baseList = signal<EventDto[]>([]);
  events = signal<EventDto[]>([]);

  currentPage = signal(1);
  pageSize = 5;

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

  filtra(
  name: string,
  location: string,
  description: string,
  start: string,
  end: string
) {
  const n = name?.trim() || null;
  const d = description?.trim() || null;
  const l = location?.trim() || null;
  const startIso = start ? `${start} 00:00:00` : null;
  const endIso   = end   ? `${end} 23:59:59`   : null;

  // CASO: entrambe le date → Between
  if (startIso && endIso) {
    this.eventService.findByDataBetween(startIso, endIso).subscribe({
      next: (res: any) => { this.events.set(Array.isArray(res) ? res : [res]); this.currentPage.set(1); },
      error: (err) => console.error(err)
    });
    return;
  }

  // CASO: solo start → After
  if (startIso) {
    this.eventService.findByDataAfter(startIso).subscribe({
      next: (res: any) => { this.events.set(Array.isArray(res) ? res : [res]); this.currentPage.set(1); },
      error: (err) => console.error(err)
    });
    return;
  }

  // CASO: solo end → Before
  if (endIso) {
    this.eventService.findByDataBefore(endIso).subscribe({
      next: (res: any) => { this.events.set(Array.isArray(res) ? res : [res]); this.currentPage.set(1); },
      error: (err) => console.error(err)
    });
    return;
  }

  // CASO: solo nome
  if (n) {
    this.eventService.findByName(n).subscribe({
      next: (res) => {
        this.events.set(res); // 🔥 diretto
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // CASO: solo descrizione
  if (d) {
    this.eventService.findByDescription(d).subscribe({
      next: (res) => {
        this.events.set(res); // 🔥 diretto
        this.currentPage.set(1);
      },
      error: (err) => console.error(err)
    });
    return;
  }

  // CASO: solo luogo
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

  // NESSUN FILTRO → reset
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
    // Avanza allo step successivo o chiudi a step 3
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
    img.src = 'assets/placeholder.png'; // tua immagine fallback
    img.alt = 'Immagine non disponibile';
  }
}