import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventService } from '../../Service/event-service';
import { EventDto } from '../../Dto/EventDto';
import { Type } from '../../Dto/enums/event-type';

@Component({
  selector: 'app-admin-event-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-event-component.html',
  styleUrl: './admin-event-component.css',
})
export class AdminEventComponent {

  private eventService = inject(EventService);

  
  events: EventDto[] = [];

  types = Object.values(Type);

  
  modalOpen = false;
  editMode = false;

  
  form: EventDto = this.resetForm();

  
  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents()
      .subscribe(res => {
        this.events = res as any;
      });
  }

  
  openCreate() {
    this.editMode = false;
    this.form = this.resetForm();
    this.modalOpen = true;
  }


  edit(event: EventDto) {
    this.editMode = true;
    this.form = { ...event };
    this.modalOpen = true;
  }

  // SAVE (CREATE / UPDATE)
  
  save() {
    if (this.editMode) {
      this.eventService.update(this.form).subscribe(() => {
        this.afterSave();
      });
    } else {
      this.eventService.insert(this.form).subscribe(() => {
        this.afterSave();
      });
    }
  }

  
  delete(id?: number | null) {
    if (!id) return;

    if (confirm('Sei sicuro di voler eliminare questo evento?')) {
      this.eventService.delete(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  
  close() {
    this.modalOpen = false;
  }

  
  private afterSave() {
    this.loadEvents();
    this.close();
  }
  
  resetForm(): EventDto {
    return {
      name: '',
      description: '',
      location: '',
      imagePath: '',
      date: Date.now(),
      maxTickets: 100,
      selledTickets: 0,
      type: Type.CONCERTI,
      ticketPrice: 0,
      ticketIds: []
    };
  }
}