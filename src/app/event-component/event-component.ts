import { Component, signal, OnInit } from '@angular/core';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-component.html',
  styleUrl: './event-component.css',
})
export class EventComponent implements OnInit {

  constructor(private eventService: EventService) { }

  // =========================
  // SIGNAL STATE
  // =========================
  baseList = signal<EventDto[]>([]);
  events = signal<EventDto[]>([]);

  // =========================
  // UI STATE
  // =========================
  selectedEvent: EventDto | null = null;

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
      },
      error: (err) => {
        console.error('Errore nel caricamento eventi', err);
      }
    });
  }

  filtra(
    name: string,
    location: string,
    start: string,
    end: string
  ) {

    const n = name?.trim() || null;
    const l = location?.trim() || null;

    // CASO: FILTRO DATA
    if (start && end) {
      this.eventService.findByDateBetween(start, end).subscribe({
        next: (res: any) => {
          const data = Array.isArray(res) ? res : [res];
          this.events.set(data);
        },
        error: (err) => console.error(err)
      });
      return;
    }

    // CASO: SOLO NOME
    if (n) {
      this.eventService.findByName(n).subscribe({
        next: (res: any) => {
          const data = Array.isArray(res) ? res : [res];
          this.events.set(data);
        },
        error: (err) => console.error(err)
      });
      return;
    }

    // CASO: SOLO LUOGO
    if (l) {
      this.eventService.findByLocation(l).subscribe({
        next: (res: any) => {
          const data = Array.isArray(res) ? res : [res];
          this.events.set(data);
        },
        error: (err) => console.error(err)
      });
      return;
    }

    // NESSUN FILTRO → reset
    this.events.set(this.baseList());
  }

  // =========================
  // RESET
  // =========================
  reset(
    nameInput: HTMLInputElement,
    locationInput: HTMLInputElement,
    startDate: HTMLInputElement,
    endDate: HTMLInputElement
  ) {
    // reset dati
    this.events.set(this.baseList());

    // reset input UI
    nameInput.value = '';
    locationInput.value = '';
    startDate.value = '';
    endDate.value = '';
  }

  // =========================
  // SELECT EVENT
  // =========================
  selectEvent(e: EventDto) {
    this.selectedEvent = e;
  }

  closePopup() {
    this.selectedEvent = null;
  }
}