import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';

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
  private readonly eventService = inject(EventService);
  private readonly imageService = inject(ImageService);

  events: EventDto[] = [];
  readonly types = Object.values(Type);

  modalOpen = false;
  editMode = false;
  isSaving = false;

  form: EventDto = this.resetForm();

  selectedFile: File | null = null;
  previewImage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res;
      },
      error: () => {
        this.errorMessage = 'Errore nel caricamento eventi.';
      },
    });
  }

  openCreate(): void {
    this.editMode = false;
    this.form = this.resetForm();
    this.resetUploadState();
    this.errorMessage = null;
    this.modalOpen = true;
  }

  edit(event: EventDto): void {
    this.editMode = true;
    this.form = { ...event };
    this.selectedFile = null;
    this.previewImage = event.imagePath?.trim() ? event.imagePath : null;
    this.errorMessage = null;
    this.modalOpen = true;
  }

  onFileSelected(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.selectedFile = null;
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeMb = 5;

    if (!allowedTypes.includes(file.type)) {
      this.errorMessage = 'Formato non valido. Usa JPG, PNG o WEBP.';
      this.selectedFile = null;
      input.value = '';
      return;
    }

    if (file.size > maxSizeMb * 1024 * 1024) {
      this.errorMessage = `Immagine troppo grande. Max ${maxSizeMb}MB.`;
      this.selectedFile = null;
      input.value = '';
      return;
    }

    this.errorMessage = null;
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = (reader.result as string) || null;
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    if (this.isSaving) return;

    if (!this.form.name?.trim() || !this.form.location?.trim()) {
      this.errorMessage = 'Nome e Location sono obbligatori.';
      return;
    }

    if (this.form.ticketPrice < 0) {
      this.errorMessage = 'Il prezzo non puÃ² essere negativo.';
      return;
    }

    this.errorMessage = null;
    this.isSaving = true;

    if (this.selectedFile) {
      this.imageService
        .uploadImage(this.selectedFile)
        .pipe(finalize(() => (this.isSaving = false)))
        .subscribe({
          next: (res) => {
            this.form.imagePath = res.secureUrl;
            this.saveEvent();
          },
          error: () => {
            this.errorMessage = 'Upload immagine fallito. Riprova.';
          },
        });
      return;
    }

    this.saveEvent();
    this.isSaving = false;
  }

  delete(id?: number | null): void {
    if (!id) return;

    if (!confirm('Sei sicuro di voler eliminare questo evento?')) return;

    this.eventService.delete(id).subscribe({
      next: () => this.loadEvents(),
      error: () => {
        this.errorMessage = 'Eliminazione fallita.';
      },
    });
  }

  close(): void {
    this.modalOpen = false;
    this.resetUploadState();
    this.errorMessage = null;
  }

  private saveEvent(): void {
    const req$ = this.editMode
      ? this.eventService.update(this.form)
      : this.eventService.insert(this.form);

    req$.subscribe({
      next: () => this.afterSave(),
      error: () => {
        this.errorMessage = 'Salvataggio evento fallito.';
      },
    });
  }

  private afterSave(): void {
    this.loadEvents();
    this.close();
  }

  private resetUploadState(): void {
    this.selectedFile = null;
    this.previewImage = null;
  }

  private resetForm(): EventDto {
    return {
      id: null,
      name: '',
      description: '',
      location: '',
      imagePath: '',
      date: Date.now(),
      maxTickets: 100,
      selledTickets: 0,
      type: Type.CONCERTI,
      ticketPrice: 0,
      ticketIds: [],
    };
  }
}