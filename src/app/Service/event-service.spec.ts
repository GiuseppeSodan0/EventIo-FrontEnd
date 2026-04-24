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

  // =========================
  // 🔹 GET ALL
  // =========================
  it('should call getAllEvents', () => {
    service.getAllEvents().subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/Event/getall')
    );

    expect(req.request.method).toBe('GET');
  });

  // =========================
  // 🔹 FIND BY NAME
  // =========================
  it('should call findByName', () => {
    service.findByName('Coldplay').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByName')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name')).toBe('Coldplay');
  });

  // =========================
  // 🔹 FIND BY DESCRIPTION
  // =========================
  it('should call findByDescription', () => {
    service.findByDescription('Live').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByDescription')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('description')).toBe('Live');
  });

  // =========================
  // 🔹 FIND BY LOCATION
  // =========================
  it('should call findByLocation', () => {
    service.findByLocation('Napoli').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByLocation')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('location')).toBe('Napoli');
  });

  // =========================
  // 🔹 FIND BY DATE BETWEEN
  // =========================
  it('should call findByDataBetween', () => {
    service.findByDataBetween('2026-01-01', '2026-12-31').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByDataBetween')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('startDate')).toBe('2026-01-01');
    expect(req.request.params.get('endDate')).toBe('2026-12-31');
  });

  // =========================
  // 🔹 FIND BY DATE AFTER
  // =========================
  it('should call findByDataAfter', () => {
    service.findByDataAfter('2026-01-01').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByDataAfter')
    );

    expect(req.request.params.get('data')).toBe('2026-01-01');
  });

  // =========================
  // 🔹 FIND BY DATE BEFORE
  // =========================
  it('should call findByDataBefore', () => {
    service.findByDataBefore('2026-12-31').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/findByDataBefore')
    );

    expect(req.request.params.get('data')).toBe('2026-12-31');
  });

  // =========================
  // 🔹 SELLED TICKETS
  // =========================
  it('should get selled tickets by event id', () => {
    service.getSelledTicketsByEventId(1).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/getSelledTicketsByEventId')
    );

    expect(req.request.params.get('eventId')).toBe('1');
  });

  // =========================
  // 🔹 AVAILABLE TICKETS
  // =========================
  it('should get available tickets by event id', () => {
    service.getAvailableTicketsByEventId(2).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/getAvailableTicketsByEventId')
    );

    expect(req.request.params.get('eventId')).toBe('2');
  });

  // =========================
  // 🔹 ADVANCED SEARCH (NEW)
  // =========================
  it('should call advancedSearch with all params', () => {
    service.advancedSearch(
      'Music',
      'Live',
      'Napoli',
      '2026-01-01',
      '2026-12-31'
    ).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/advancedSearch')
    );

    expect(req.request.method).toBe('GET');

    expect(req.request.params.get('name')).toBe('Music');
    expect(req.request.params.get('description')).toBe('Live');
    expect(req.request.params.get('location')).toBe('Napoli');
    expect(req.request.params.get('startDate')).toBe('2026-01-01');
    expect(req.request.params.get('endDate')).toBe('2026-12-31');
  });

  it('should call advancedSearch with partial params', () => {
    service.advancedSearch('Music', undefined, 'Napoli').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.endsWith('/advancedSearch')
    );

    expect(req.request.params.get('name')).toBe('Music');
    expect(req.request.params.get('location')).toBe('Napoli');
    expect(req.request.params.has('description')).toBeFalse();
  });

});