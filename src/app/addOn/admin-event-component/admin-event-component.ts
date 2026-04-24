import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../Service/event-service';
import { EventDto } from '../../Dto/EventDto';

@Component({
  selector: 'app-admin-event-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-event-component.html',
  styleUrl: './admin-event-component.css',
})
export class AdminEventComponent {

  private eventService = inject(EventService);

  events: EventDto[] = [];

  loadEvents() {
    this.eventService.getAllEvents()
      .subscribe(res => this.events = res as any);
  }

  ngOnInit() {
    this.loadEvents();
  }
}