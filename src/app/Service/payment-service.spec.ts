import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './PaymentService';
import { PaymentDto } from '../Dto/PaymentDto';

describe('PaymentService', () => {
    let service: PaymentService;
    let httpMock: HttpTestingController;

    const checkoutUrl = 'http://localhost:8080/api/checkout';
    const paymentUrl = 'http://localhost:8080/api/payment';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PaymentService]
        });

        service = TestBed.inject(PaymentService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should create order (checkout)', () => {
        const payload = { total: 100 };

        service.createOrder(payload).subscribe(res => {
            expect(res).toBe('OK');
        });

        const req = httpMock.expectOne(checkoutUrl);

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payload);
        expect(req.request.responseType).toBe('text');

        req.flush('OK');
    });

    it('should create payment', () => {
        const payment: PaymentDto = {
            id: 1,
            method: 'CARD',
            amount: 50,
            userId: 1
        } as any;

        service.createPayment(payment).subscribe(res => {
            expect(res.method).toBe('CARD');
        });

        const req = httpMock.expectOne(`${paymentUrl}/insert`);

        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(payment);

        req.flush(payment);
    });

    it('should find payments by method', () => {
        const mockPayments: PaymentDto[] = [
            { id: 1, method: 'CARD', amount: 20, userId: 1 } as any
        ];

        service.findByMethod('CARD').subscribe(res => {
            expect(res.length).toBe(1);
        });

        const req = httpMock.expectOne(`${paymentUrl}/method/CARD`);
        expect(req.request.method).toBe('GET');

        req.flush(mockPayments);
    });

    it('should find payments by userId', () => {
        const mockPayments: PaymentDto[] = [
            { id: 1, method: 'PAYPAL', amount: 30, userId: 2 } as any
        ];

        service.findByUserId(2).subscribe(res => {
            expect(res[0].userId).toBe(2);
        });

        const req = httpMock.expectOne(`${paymentUrl}/user/2`);
        expect(req.request.method).toBe('GET');

        req.flush(mockPayments);
    });

    it('should get all payments', () => {
        const mockPayments: PaymentDto[] = [
            { id: 1, method: 'CARD', amount: 10, userId: 1 } as any
        ];

        service.getAll().subscribe(res => {
            expect(res.length).toBe(1);
        });

        const req = httpMock.expectOne(`${paymentUrl}/getall`);
        expect(req.request.method).toBe('GET');

        req.flush(mockPayments);
    });
});