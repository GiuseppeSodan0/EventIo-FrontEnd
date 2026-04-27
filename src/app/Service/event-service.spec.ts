import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EventService } from './event-service';
import { EventDto } from '../Dto/EventDto';

describe('EventService', () => {
  let service: EventService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:8080'; // ⚠️ adegua se diverso nel tuo AbstractService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService],
    });

    service = TestBed.inject(EventService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllEvents', () => {
    const mockResponse: EventDto[] = [] as any;

    service.getAllEvents().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${baseUrl}/Event/getall`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call findByName', () => {
    service.findByName('Music').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.includes('/findByName') && r.params.get('name') === 'Music'
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call advancedSearch with partial params', () => {
    service.advancedSearch('Music', undefined, 'Napoli').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.includes('/advancedSearch')
    );

    expect(req.request.params.get('name')).toBe('Music');
    expect(req.request.params.get('location')).toBe('Napoli');

    // FIX: toBeFalse NON ESISTE in Vitest/Chai
    expect(req.request.params.has('description')).toBeFalsy();

    req.flush([]);
  });

  it('should call findById', () => {
    service.findById(1).subscribe();

    const req = httpMock.expectOne(r =>
      r.url.includes('/findById') && r.params.get('id') === '1'
    );

    expect(req.request.method).toBe('GET');
    req.flush({} as EventDto);
  });

  it('should call findTop5MostRemunerative', () => {
    service.findTop5MostRemunerative().subscribe();

    const req = httpMock.expectOne(r =>
      r.url.includes('/findTop5MostRemunerative')
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should call findByLocation', () => {
    service.findByLocation('Napoli').subscribe();

    const req = httpMock.expectOne(r =>
      r.url.includes('/findByLocation') && r.params.get('location') === 'Napoli'
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});