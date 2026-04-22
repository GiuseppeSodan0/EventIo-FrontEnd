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
  readonly cardLayoutClasses = signal<string[]>([]);

  private readonly layoutTemplates: readonly string[][] = [
    ['tile-tall', 'tile-wide', 'tile-tall', 'tile-small', 'tile-small'],
    ['tile-hero', 'tile-small', 'tile-wide', 'tile-small', 'tile-tall'],
    ['tile-wide', 'tile-small', 'tile-tall', 'tile-small', 'tile-wide'],
    ['tile-small', 'tile-tall', 'tile-wide', 'tile-small', 'tile-hero'],
    ['tile-tall', 'tile-small', 'tile-small', 'tile-wide', 'tile-tall'],
  ];

  ngOnInit(): void {
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
    this.eventService.findTop5MostRemunerative().subscribe({
      next: (events: EventDto[]) => {
        this.mostRenumerativeEvents.set(events);
        this.cardLayoutClasses.set(this.buildRandomLayout(events.length));
      },
      error: (error: unknown) => {
        console.error('Error fetching most remunerative events:', error);
      },
    });
  }

  getTileClass(index: number): string {
    return this.cardLayoutClasses()[index] ?? 'tile-small';
  }

  private buildRandomLayout(eventCount: number): string[] {
    if (eventCount <= 0) {
      return [];
    }

    const randomTemplate =
      this.layoutTemplates[Math.floor(Math.random() * this.layoutTemplates.length)];

    return Array.from({ length: eventCount }, (_, index) =>
      randomTemplate[index % randomTemplate.length] ?? 'tile-small'
    );
  }

}
