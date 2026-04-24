import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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

  readonly mostRenumerativeEvents = signal<HomeEventCard[]>([]);
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
    this.eventService
      .findTop5MostRemunerative()
      .pipe(
        switchMap((events: EventDto[]) => this.attachImageUrls(events))
      )
      .subscribe({
      next: (events: HomeEventCard[]) => {
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

}
