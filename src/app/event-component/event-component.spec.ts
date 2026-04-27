import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventComponent } from './event-component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '../Service/event-service';
import { AuthService } from '../Service/auth-service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('EventComponent', () => {

  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let eventServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {

    eventServiceMock = {
      getAllEvents: vi.fn().mockReturnValue(of([])), // FIX QUI
      findByName: vi.fn().mockReturnValue(of([])),
      findByDescription: vi.fn().mockReturnValue(of([])),
      findByLocation: vi.fn().mockReturnValue(of([])),
      findByDataBetween: vi.fn().mockReturnValue(of([])),
      findByDataAfter: vi.fn().mockReturnValue(of([])),
      findByDataBefore: vi.fn().mockReturnValue(of([])),
      advancedSearch: vi.fn().mockReturnValue(of([])),
      getSelledTicketsByEventId: vi.fn().mockReturnValue(of(10)),
      getAvailableTicketsByEventId: vi.fn().mockReturnValue(of(20)),
    };

    authServiceMock = {
      isLoggedIn: vi.fn().mockReturnValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [
        EventComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParamMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on init', () => {
    expect(eventServiceMock.getAllEvents).toHaveBeenCalled();
  });

  it('should allow selectEvent only if logged in', () => {

    const mockEvent: any = {
      id: 1,
      name: 'Test',
      maxTickets: 10,
      selledTickets: 2
    };

    component.selectEvent(mockEvent);

    expect(authServiceMock.isLoggedIn).toHaveBeenCalled();
    expect(component.selectedEvent).toBe(mockEvent);
  });

  it('should paginate correctly', () => {

    component.events.set([
      { id: 1 } as any,
      { id: 2 } as any,
      { id: 3 } as any,
      { id: 4 } as any,
      { id: 5 } as any,
    ]);

    component.currentPage.set(1);

    expect(component.pagedEvents.length).toBe(4);
  });

  it('should load ticket stats', () => {

    component.loadTicketStats(1);

    expect(eventServiceMock.getSelledTicketsByEventId).toHaveBeenCalledWith(1);
    expect(eventServiceMock.getAvailableTicketsByEventId).toHaveBeenCalledWith(1);
  });

  it('should call advancedSearch when multiple filters are active', () => {

    component.filtra(
      'Music',
      'Napoli',
      'Live',
      '2026-01-01',
      '2026-12-31'
    );

    expect(eventServiceMock.advancedSearch).toHaveBeenCalled();
  });

  it('should call findByName when only name is provided', () => {

    component.filtra('Music', '', '', '', '');

    expect(eventServiceMock.findByName).toHaveBeenCalledWith('Music');
  });

  it('should call findByDescription when only description is provided', () => {

    component.filtra('', '', 'Live', '', '');

    expect(eventServiceMock.findByDescription).toHaveBeenCalledWith('Live');
  });

  it('should call findByLocation when only location is provided', () => {

    component.filtra('', 'Napoli', '', '', '');

    expect(eventServiceMock.findByLocation).toHaveBeenCalledWith('Napoli');
  });

  it('should call advancedSearch when date range is provided', () => {
    component.filtra('', '', '', '2026-01-01', '2026-12-31');

    expect(eventServiceMock.advancedSearch).toHaveBeenCalled();
  });

});