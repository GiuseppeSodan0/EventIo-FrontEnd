import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventComponent } from './event-component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EventService } from '../Service/event-service';
import { AuthService } from '../Service/auth-service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('EventComponent', () => {

  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;
  let eventServiceMock: any;
  let authServiceMock: any;

  beforeEach(async () => {

    eventServiceMock = {
      getAllEvents: vi.fn().mockReturnValue(of([])),
      findByName: vi.fn().mockReturnValue(of([])),
      findByDescription: vi.fn().mockReturnValue(of([])),
      findByLocation: vi.fn().mockReturnValue(of([])),
      findByDataBetween: vi.fn().mockReturnValue(of([])),
      findByDataAfter: vi.fn().mockReturnValue(of([])),
      findByDataBefore: vi.fn().mockReturnValue(of([])),
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
        { provide: AuthService, useValue: authServiceMock }
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

    const mockEvent: any = { id: 1, name: 'Test', maxTickets: 10, selledTickets: 2 };

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

});