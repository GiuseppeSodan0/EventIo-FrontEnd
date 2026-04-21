import { Component, NgZone } from '@angular/core';
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
  mostRenumerativeEvents: EventDto[] = [];

  constructor(private eventService: EventService, private ngZone: NgZone) {}

  currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
  this.eventService.findTop5MostRemunerative().subscribe({
    next: (events: EventDto[]) => {
      this.mostRenumerativeEvents = events;
      this.startAutoSlide(); // 👈 AVVIA SLIDER
    },
    error: (error: unknown) => {
      console.error('Error fetching most remunerative events:', error);
    },
  });
}

startAutoSlide() {
  this.stopAutoSlide();

  this.intervalId = setInterval(() => {

    this.ngZone.run(() => {  // 👈 QUESTO RISOLVE TUTTO
      this.next();
    });

  }, 3000);
}

stopAutoSlide() {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
}

next() {
  if (!this.mostRenumerativeEvents.length) return;

  this.currentIndex =
    (this.currentIndex + 1) % this.mostRenumerativeEvents.length;

  this.startAutoSlide(); // 🔥 reset timer
}

prev() {
  if (!this.mostRenumerativeEvents.length) return;

  this.currentIndex =
    (this.currentIndex - 1 + this.mostRenumerativeEvents.length) %
    this.mostRenumerativeEvents.length;

  this.startAutoSlide(); // 🔥 reset timer
}

}
