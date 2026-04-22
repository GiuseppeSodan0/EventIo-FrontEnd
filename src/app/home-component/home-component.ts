import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);

  readonly mostRenumerativeEvents = signal<EventDto[]>([]);
  readonly selectedPattern = signal('pattern-a');

  private readonly layoutPatterns = [
    'pattern-a',
    'pattern-b',
    'pattern-c',
  ];

  ngOnInit(): void {
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
    this.eventService.findTop5MostRemunerative().subscribe({
      next: (events: EventDto[]) => {
        this.mostRenumerativeEvents.set(events);
        this.selectedPattern.set(this.pickRandomPattern());
      },
      error: (error: unknown) => {
        console.error('Error fetching most remunerative events:', error);
      },
    });
  }

  navigateToEvent(event: EventDto): void {
    this.router.navigate(['/events'], {
      queryParams: { selectEvent: event.id },
    });
  }

  private pickRandomPattern(): string {
    return this.layoutPatterns[
      Math.floor(Math.random() * this.layoutPatterns.length)
    ];
  }

}
