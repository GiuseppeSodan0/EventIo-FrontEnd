import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { HomeComponent } from './home-component';
import { EventService } from '../Service/event-service';
import { ImageService } from '../Service/image-service';
import { EventDto } from '../Dto/EventDto';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventService>;
  let imageServiceSpy: jasmine.SpyObj<ImageService>;

  const buildEvent = (id: number, name: string): EventDto =>
    new EventDto(
      name,
      `${name} description`,
      'Rome',
      '',
      Date.now(),
      100,
      25,
      'music',
      49,
      [],
      id
    );

  beforeEach(async () => {
    eventServiceSpy = jasmine.createSpyObj<EventService>('EventService', [
      'findTop5MostRemunerative',
    ]);
    imageServiceSpy = jasmine.createSpyObj<ImageService>('ImageService', [
      'getImageUrlByEventId',
    ]);

    eventServiceSpy.findTop5MostRemunerative.and.returnValue(
      of([buildEvent(1, 'Spring Festival'), buildEvent(2, 'Summer Vibes')])
    );
    imageServiceSpy.getImageUrlByEventId.and.returnValue(
      of('http://img.com/spring-festival.jpg')
    );

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: EventService, useValue: eventServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        {
          provide: Router,
          useValue: jasmine.createSpyObj<Router>('Router', ['navigate']),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load image urls for top events', () => {
    expect(eventServiceSpy.findTop5MostRemunerative).toHaveBeenCalled();
    expect(imageServiceSpy.getImageUrlByEventId).toHaveBeenCalledWith(1);
    expect(imageServiceSpy.getImageUrlByEventId).toHaveBeenCalledWith(2);
    expect(component.mostRenumerativeEvents()[0]?.imageUrl).toBe(
      'http://img.com/spring-festival.jpg'
    );
  });

  it('should render the event image in the featured card', () => {
    const image: HTMLImageElement | null =
      fixture.nativeElement.querySelector('.card-image');

    expect(image).not.toBeNull();
    expect(image?.src).toContain('http://img.com/spring-festival.jpg');
    expect(image?.alt).toBe('Spring Festival');
  });

  it('should autoplay to the next event every 5 seconds', fakeAsync(() => {
    expect(component.currentEventIndex()).toBe(0);

    tick(5000);
    fixture.detectChanges();

    expect(component.currentEventIndex()).toBe(1);
    expect(component.currentEvent()?.name).toBe('Summer Vibes');
  }));
});
