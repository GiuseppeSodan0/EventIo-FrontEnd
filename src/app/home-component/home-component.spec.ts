import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home-component';
import { EventService } from '../Service/event-service';
import { ImageService } from '../Service/image-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EventDto } from '../Dto/EventDto';
import { vi } from 'vitest';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockEvents: EventDto[] = [
    { id: 1, name: 'Event 1', imagePath: 'img1.jpg' } as any,
    { id: 2, name: 'Event 2', imagePath: 'img2.jpg' } as any,
  ];

  const eventServiceMock = {
    findTop5MostRemunerative: vi.fn(),
  };

  const imageServiceMock = {
    getImageUrlByEventId: vi.fn(),
  };

  const routerMock = {
    navigate: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: EventService, useValue: eventServiceMock },
        { provide: ImageService, useValue: imageServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load most remunerative events', () => {
    imageServiceMock.getImageUrlByEventId.mockReturnValue(of('url'));
    eventServiceMock.findTop5MostRemunerative.mockReturnValue(of(mockEvents));

    fixture.detectChanges();

    expect(component.mostRenumerativeEvents().length).toBe(2);
    expect(component.currentEventIndex()).toBe(0);
  });

  it('should return current event correctly', () => {
    component.mostRenumerativeEvents.set([
      { id: 1, name: 'A' } as any,
      { id: 2, name: 'B' } as any,
    ]);

    component.currentEventIndex.set(1);

    expect(component.currentEvent()?.id).toBe(2);
  });

  it('should go to next event', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any,
    ]);

    component.currentEventIndex.set(0);
    component.nextEvent();

    expect(component.currentEventIndex()).toBe(1);
  });

  it('should go to previous event with wrap', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any,
    ]);

    component.currentEventIndex.set(0);
    component.previousEvent();

    expect(component.currentEventIndex()).toBe(1);
  });

  it('should not change index if only one event', () => {
    component.mostRenumerativeEvents.set([{ id: 1 } as any]);
    component.currentEventIndex.set(0);

    component.nextEvent();

    expect(component.currentEventIndex()).toBe(0);
  });

  it('should navigate to event', () => {
    const event = { id: 10 } as any;

    component.navigateToEvent(event);

    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['/events'],
      { queryParams: { selectEvent: 10 } }
    );
  });

  it('should select event by index', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any,
    ]);

    component.selectEvent(1);

    expect(component.currentEventIndex()).toBe(1);
  });

  it('should ignore invalid index in selectEvent', () => {
    component.mostRenumerativeEvents.set([{ id: 1 } as any]);

    component.selectEvent(99);

    expect(component.currentEventIndex()).toBe(0);
  });

  it('should autoplay every 5 seconds', fakeAsync(() => {
    imageServiceMock.getImageUrlByEventId.mockReturnValue(of('url'));
    eventServiceMock.findTop5MostRemunerative.mockReturnValue(of(mockEvents));

    fixture.detectChanges();

    expect(component.currentEventIndex()).toBe(0);

    tick(5000);
    expect(component.currentEventIndex()).toBe(1);

    tick(5000);
    expect(component.currentEventIndex()).toBe(0);
  }));
});