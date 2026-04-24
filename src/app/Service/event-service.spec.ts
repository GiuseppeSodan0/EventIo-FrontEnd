import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event-service';

describe('EventService', () => {

  let service: EventService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService]
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getAllEvents', () => {

    service.getAllEvents().subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/Event/getall')
    );

    expect(req.request.method).toBe('GET');
  });

  it('should call findByName', () => {

    service.findByName('Coldplay').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByName')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name')).toBe('Coldplay');
  });

  it('should call findByDataBetween', () => {

    service.findByDataBetween('2026-01-01', '2026-12-31').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByDataBetween')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('startDate')).toBe('2026-01-01');
    expect(req.request.params.get('endDate')).toBe('2026-12-31');
  });

  it('should get selled tickets by event id', () => {

    service.getSelledTicketsByEventId(1).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/getSelledTicketsByEventId')
    );

    expect(req.request.params.get('eventId')).toBe('1');
  });

  it('should get available tickets by event id', () => {

    service.getAvailableTicketsByEventId(2).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/getAvailableTicketsByEventId')
    );

    expect(req.request.params.get('eventId')).toBe('2');
  });

});