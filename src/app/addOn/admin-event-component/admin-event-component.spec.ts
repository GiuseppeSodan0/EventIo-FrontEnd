import { TestBed } from '@angular/core/testing';
import { AdminEventComponent } from './admin-event-component';
import { EventService } from '../../Service/event-service';
import { ImageService } from '../../Service/image-service';
import { of, throwError } from 'rxjs';
import { vi } from 'vitest';

describe('AdminEventComponent', () => {
  let component: AdminEventComponent;

  let eventServiceMock: any;
  let imageServiceMock: any;

  beforeEach(async () => {
    eventServiceMock = {
      getAllEvents: vi.fn(() => of([])), // ✅ FIX CRITICO
      insert: vi.fn(() => of({})),
      update: vi.fn(() => of({})),
      delete: vi.fn(() => of({})),
    };

    imageServiceMock = {
      uploadImage: vi.fn(() =>
        of({ secureUrl: 'http://image.test/img.jpg' })
      ),
      getImageUrlByEventId: vi.fn(() =>
        of('http://image.test/img.jpg')
      ),
    };

    await TestBed.configureTestingModule({
      imports: [AdminEventComponent],
      providers: [
        { provide: EventService, useValue: eventServiceMock },
        { provide: ImageService, useValue: imageServiceMock },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AdminEventComponent);
    component = fixture.componentInstance;

    // mock confirm globale
    vi.stubGlobal('confirm', vi.fn(() => true));
    vi.stubGlobal('alert', vi.fn());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on init', () => {
    component.ngOnInit();

    expect(eventServiceMock.getAllEvents).toHaveBeenCalled();
  });

  it('should call insert on create save', () => {
    component.openCreate();

    component.form = {
      ...component.form,
      name: 'Test',
      description: 'Desc',
      location: 'Napoli',
      type: 'CONCERTI',
      ticketPrice: 10,
      maxTickets: 100,
      imagePath: 'img.jpg',
      date: Date.now(),
      selledTickets: 0,
      ticketIds: [],
    };

    component.formDate = '2024-01-01';

    component.save();

    expect(eventServiceMock.insert).toHaveBeenCalled();
  });

  it('should call update on edit save', () => {
    component.editMode = true;

    component.form = {
      ...component.form,
      id: 1,
      name: 'Test',
      description: 'Desc',
      location: 'Napoli',
      type: 'CONCERTI',
      ticketPrice: 10,
      maxTickets: 100,
      imagePath: 'img.jpg',
      date: Date.now(),
      selledTickets: 5,
      ticketIds: [],
    };

    component.formDate = '2024-01-01';

    component.save();

    expect(eventServiceMock.update).toHaveBeenCalled();
  });

  it('should delete event', () => {
    component.events.set([
      {
        id: 1,
        name: 'Test',
        description: 'Desc',
        location: 'Napoli',
        imagePath: 'img.jpg',
        date: Date.now(),
        maxTickets: 100,
        selledTickets: 0,
        type: 'CONCERTI',
        ticketPrice: 10,
        ticketIds: [],
      } as any,
    ]);

    component.delete(component.events()[0]);

    expect(eventServiceMock.delete).toHaveBeenCalledWith(1);
  });

  it('should handle delete error', () => {
    eventServiceMock.delete = vi.fn(() =>
      throwError(() => new Error('fail'))
    );

    component.events.set([
      {
        id: 1,
        name: 'Test',
        description: 'Desc',
        location: 'Napoli',
        imagePath: 'img.jpg',
        date: Date.now(),
        maxTickets: 100,
        selledTickets: 0,
        type: 'CONCERTI',
        ticketPrice: 10,
        ticketIds: [],
      } as any,
    ]);

    component.delete(component.events()[0]);

    expect(eventServiceMock.delete).toHaveBeenCalled();
  });

  it('should open and close modal', () => {
    component.openCreate();
    expect(component.modalOpen).toBe(true);

    component.close();
    expect(component.modalOpen).toBe(false);
  });
});