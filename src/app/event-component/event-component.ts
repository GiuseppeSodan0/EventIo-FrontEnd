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

  // =========================
  // FILTRO (BASE COME DIPENDENTE)
  // =========================
  filtraByName(name: string) {
    const v = name?.trim();

    if (!v) {
      this.events.set(this.baseList());
      return;
    }

    this.eventService.findByName(v).subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : [res];
        this.events.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  filtraByLocation(location: string) {
    const v = location?.trim();

    if (!v) {
      this.events.set(this.baseList());
      return;
    }

    this.eventService.findByLocation(v).subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : [res];
        this.events.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  /*filtraByType(type: string) {
    const v = type?.trim();

    if (!v) {
      this.events.set(this.baseList());
      return;
    }

    this.eventService.findByType(v).subscribe({
      next: (res: EventDto | EventDto[]) => {
        const data = Array.isArray(res) ? res : [res];
        this.events.set(data);
      },
      error: (err) => console.error(err)
    });
  }*/

  filtraByDate(start: string, end: string) {

    if (!start || !end) {
      this.events.set(this.baseList());
      return;
    }

    this.eventService.findByDateBetween(start, end).subscribe({
      next: (res: any) => {
        const data = Array.isArray(res) ? res : [res];
        this.events.set(data);
      },
      error: (err) => console.error(err)
    });
  }

  // =========================
  // RESET
  // =========================
  reset() {
    this.events.set(this.baseList());
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