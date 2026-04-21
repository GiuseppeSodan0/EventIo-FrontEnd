import { Component } from '@angular/core';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';

@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  mostRenumerativeEvents: EventDto[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
    this.eventService.findTop5MostRemunerative().subscribe({
      next: (events: EventDto[]) => {
        this.mostRenumerativeEvents = events;
      },
      error: (error: unknown) => {
        console.error('Error fetching most remunerative events:', error);
      },
    });
  }
}
