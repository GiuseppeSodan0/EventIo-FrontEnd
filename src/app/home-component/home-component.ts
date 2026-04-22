import { Component, inject, OnInit, signal } from '@angular/core';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  private readonly eventService = inject(EventService);

  readonly mostRenumerativeEvents = signal<EventDto[]>([]);

  ngOnInit(): void {
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
    this.eventService.findTop5MostRemunerative().subscribe({
      next: (events: EventDto[]) => {
        this.mostRenumerativeEvents.set(events);
      },
      error: (error: unknown) => {
        console.error('Error fetching most remunerative events:', error);
      },
    });
  }

}
