import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { EventDto } from '../Dto/EventDto';
import { EventService } from '../Service/event-service';
import { CommonModule } from '@angular/common';
import { ImageService } from '../Service/image-service';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

type HomeEventCard = EventDto & {
  imageUrl: string | null;
};

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly eventService = inject(EventService);
  private readonly imageService = inject(ImageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly mostRenumerativeEvents = signal<HomeEventCard[]>([]);
  readonly currentEventIndex = signal(0);

  readonly currentEvent = computed<HomeEventCard | null>(() => {
    const events = this.mostRenumerativeEvents();
    if (events.length === 0) {
      return null;
    }

    const safeIndex = this.currentEventIndex() % events.length;
    return events[safeIndex] ?? null;
  });

  readonly currentRank = computed<number>(() => {
    if (this.mostRenumerativeEvents().length === 0) {
      return 0;
    }

    return this.currentEventIndex() + 1;
  });

  private autoplayIntervalId: ReturnType<typeof setInterval> | null = null;
  private readonly autoplayMs = 5000;

  ngOnInit(): void {
    this.destroyRef.onDestroy(() => this.stopAutoplay());
    this.getMostRenumerativeEvents();
  }

  getMostRenumerativeEvents(): void {
    this.eventService
      .findTop5MostRemunerative()
      .pipe(
        switchMap((events: EventDto[]) => this.attachImageUrls(events))
      )
      .subscribe({
      next: (events: HomeEventCard[]) => {
        this.mostRenumerativeEvents.set(events);
        this.currentEventIndex.set(0);
        this.startAutoplay(events.length);
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

  nextEvent(): void {
    const eventsLength = this.mostRenumerativeEvents().length;
    if (eventsLength <= 1) {
      return;
    }

    this.currentEventIndex.update((index) => (index + 1) % eventsLength);
  }

  previousEvent(): void {
    const eventsLength = this.mostRenumerativeEvents().length;
    if (eventsLength <= 1) {
      return;
    }

    this.currentEventIndex.update((index) =>
      (index - 1 + eventsLength) % eventsLength
    );
  }

  selectEvent(index: number): void {
    const eventsLength = this.mostRenumerativeEvents().length;
    if (index < 0 || index >= eventsLength) {
      return;
    }

    this.currentEventIndex.set(index);
  }

  private attachImageUrls(events: EventDto[]): Observable<HomeEventCard[]> {
    if (events.length === 0) {
      return of([]);
    }

    return forkJoin(events.map((event) => this.toHomeEventCard(event)));
  }

  private toHomeEventCard(event: EventDto): Observable<HomeEventCard> {
    if (event.id == null) {
      return of({
        ...event,
        imageUrl: this.normalizeImageUrl(event.imagePath),
      });
    }

    return this.imageService.getImageUrlByEventId(event.id).pipe(
      map((imageUrl) => ({
        ...event,
        imageUrl,
      }))
    );
  }

  private normalizeImageUrl(imagePath: string | null | undefined): string | null {
    const normalized = imagePath?.trim();
    return normalized ? normalized : null;
  }

  private startAutoplay(eventsLength: number): void {
    this.stopAutoplay();

    if (eventsLength <= 1) {
      return;
    }

    this.autoplayIntervalId = setInterval(() => {
      this.nextEvent();
    }, this.autoplayMs);
  }

  private stopAutoplay(): void {
    if (this.autoplayIntervalId === null) {
      return;
    }

    clearInterval(this.autoplayIntervalId);
    this.autoplayIntervalId = null;
  }

}
