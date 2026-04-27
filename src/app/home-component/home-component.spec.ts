import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home-component';
import { EventService } from '../Service/event-service';
import { ImageService } from '../Service/image-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EventDto } from '../Dto/EventDto';
import { vi } from 'vitest';

describe('HomeComponent', () => {
  let component: HomeComponent;

  let eventServiceMock: any;
  let imageServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    eventServiceMock = {
      findTop5MostRemunerative: vi.fn()
    };

    imageServiceMock = {
      getImageUrlByEventId: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: EventService, useValue: eventServiceMock },
        { provide: ImageService, useValue: imageServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load most remunerative events and attach images', () => {
    const mockEvents: EventDto[] = [
      {
        id: 1,
        name: 'Event 1',
        description: 'desc',
        location: 'Napoli',
        imagePath: 'img.jpg',
        date: 123,
        maxTickets: 10,
        selledTickets: 2,
        type: 'CONCERT',
        ticketPrice: 50,
        ticketIds: []
      }
    ];

    eventServiceMock.findTop5MostRemunerative.mockReturnValue(
      of(mockEvents)
    );

    imageServiceMock.getImageUrlByEventId.mockReturnValue(
      of('http://image-url.com/img.jpg')
    );

    component.getMostRenumerativeEvents();

    expect(eventServiceMock.findTop5MostRemunerative).toHaveBeenCalled();
  });

  it('should navigate to event', () => {
    const event: EventDto = {
      id: 10,
      name: 'Test',
      description: '',
      location: '',
      imagePath: '',
      date: 0,
      maxTickets: 0,
      selledTickets: 0,
      type: '',
      ticketPrice: 0,
      ticketIds: []
    };

    component.navigateToEvent(event);

    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['/events'],
      { queryParams: { selectEvent: 10 } }
    );
  });

  it('should go to next event', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any
    ]);

    component.currentEventIndex.set(0);

    component.nextEvent();

    expect(component.currentEventIndex()).toBe(1);
  });

  it('should go to previous event', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any
    ]);

    component.currentEventIndex.set(1);

    component.previousEvent();

    expect(component.currentEventIndex()).toBe(0);
  });

  it('should select event index', () => {
    component.mostRenumerativeEvents.set([
      { id: 1 } as any,
      { id: 2 } as any
    ]);

    component.selectEvent(1);

    expect(component.currentEventIndex()).toBe(1);
  });

  it('should not select invalid index', () => {
    component.mostRenumerativeEvents.set([{ id: 1 } as any]);

    component.selectEvent(999);

    expect(component.currentEventIndex()).toBe(0);
  });

  it('should return null currentEvent if empty', () => {
    component.mostRenumerativeEvents.set([]);

    expect(component.currentEvent()).toBeNull();
  });

  it('should return correct rank', () => {
    component.mostRenumerativeEvents.set([{ id: 1 } as any]);
    component.currentEventIndex.set(2);

    expect(component.currentRank()).toBe(3);
  });
});