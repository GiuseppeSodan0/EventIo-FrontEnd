import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket-service';

describe('TicketService', () => {

    let service: TicketService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [TicketService]
        });

        service = TestBed.inject(TicketService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // =========================
    // 🔹 GET ALL
    // =========================
    it('should call getAll', () => {
        service.getAll().subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/Ticket/getall')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 INSERT
    // =========================
    it('should call insert', () => {
        const dto = { id: 1, name: 'Mario', surname: 'Rossi', price: 50 } as any;
        service.insert(dto).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/Ticket/insert')
        );

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(dto);
        req.flush(dto);
    });

    // =========================
    // 🔹 UPDATE
    // =========================
    it('should call update', () => {
        const dto = { id: 1, name: 'Mario', surname: 'Rossi', price: 60 } as any;
        service.update(dto).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/Ticket/update')
        );

        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(dto);
        req.flush(dto);
    });

    // =========================
    // 🔹 DELETE
    // =========================
    it('should call delete', () => {
        service.delete(1).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.includes('/Ticket/delete') && r.url.includes('id=1')
        );

        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    // =========================
    // 🔹 FIND BY NAME AND SURNAME
    // =========================
    it('should call findByNameAndSurname', () => {
        service.findByNameAndSurname('Mario', 'Rossi').subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByNameAndSurname?name=Mario&surname=Rossi')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY CREATION DATE
    // =========================
    it('should call findByCreationDate', () => {
        service.findByCreationDate('2026-04-19').subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByCreationDate?creationDate=2026-04-19')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY PRICE GREATER
    // =========================
    it('should call findByPriceGreater', () => {
        service.findByPriceGreater(30).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByPriceGreaterThanEqual?price=30')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY PRICE LESS
    // =========================
    it('should call findByPriceLess', () => {
        service.findByPriceLess(100).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByPriceLessThanEqual?price=100')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY PRICE RANGE
    // =========================
    it('should call findByPriceRange', () => {
        service.findByPriceRange(10, 100).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByPriceRange?initialPrice=10&endPrice=100')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY EVENT
    // =========================
    it('should call findByEvent', () => {
        service.findByEvent(5).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/Ticket/event/5')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY STATUS
    // =========================
    it('should call findByStatus', () => {
        service.findByStatus('ACTIVE').subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/Ticket/status/ACTIVE')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

    // =========================
    // 🔹 FIND BY USER ID
    // =========================
    it('should call findTicketByUserId', () => {
        service.findTicketByUserId(2).subscribe();

        const req = httpMock.expectOne(r =>
            r.url.endsWith('/findTicketByUserId?userId=2')
        );

        expect(req.request.method).toBe('GET');
        req.flush([]);
    });

});