import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, map, Observable, of, switchMap } from 'rxjs';

import { EventService } from '../../Service/event-service';
import { ImageService } from '../../Service/image-service';
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
  private imageService = inject(ImageService);

  
  events: EventDto[] = [];

  types = Object.values(Type);

  
  modalOpen = false;
  editMode = false;

  
  form: EventDto = this.resetForm();
  formDate = '';
  selectedImageFile: File | null = null;
  uploadInProgress = false;
  saveError = '';

  
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
    this.syncDateInputFromForm();
    this.selectedImageFile = null;
    this.saveError = '';
    this.modalOpen = true;
  }


  edit(event: EventDto) {
    this.editMode = true;
    this.form = { ...event };
    this.syncDateInputFromForm();
    this.selectedImageFile = null;
    this.saveError = '';
    this.modalOpen = true;
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.selectedImageFile = file;
    this.saveError = '';
  }

  // SAVE (CREATE / UPDATE)
  
  save() {
    this.saveError = '';

    this.applyDateInputToForm();
    this.form.maxTickets = Number(this.form.maxTickets || 0);

    if (this.editMode) {
      this.form.selledTickets = Number(this.form.selledTickets || 0);
    } else {
      this.form.selledTickets = 0;
    }

    this.form.ticketPrice = Number(this.form.ticketPrice || 0);

    this.uploadInProgress = !!this.selectedImageFile;

    this.uploadImageIfNeeded()
      .pipe(
        switchMap(() => this.persistEvent()),
        finalize(() => {
          this.uploadInProgress = false;
        })
      )
      .subscribe({
        next: () => this.afterSave(),
        error: () => {
          this.saveError = 'Errore durante upload immagine o salvataggio evento.';
        }
      });
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
    this.selectedImageFile = null;
    this.saveError = '';
  }

  
  private afterSave() {
    this.loadEvents();
    this.close();
  }

  private uploadImageIfNeeded(): Observable<void> {
    if (!this.selectedImageFile) {
      return of(void 0);
    }

    return this.imageService.uploadImage(this.selectedImageFile).pipe(
      map((response) => {
        this.form.imagePath = response.secureUrl;
      })
    );
  }

  private persistEvent(): Observable<unknown> {
    if (this.editMode) {
      return this.eventService.update(this.form);
    }

    return this.eventService.insert(this.form);
  }

  private syncDateInputFromForm() {
    const date = new Date(this.form.date || Date.now());
    this.formDate = date.toISOString().slice(0, 10);
  }

  private applyDateInputToForm() {
    if (!this.formDate) {
      this.form.date = Date.now();
      return;
    }

    this.form.date = new Date(`${this.formDate}T00:00:00`).getTime();
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