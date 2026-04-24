import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth-service';
import { Role } from '../Dto/enums/user-type';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const baseUrl = 'http://localhost:8080/auth';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService]
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);

        // reset stato statico tra i test
        service.logout();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // =========================
    // LOGIN HTTP
    // =========================
    it('should call login API', () => {

        const mockRequest = { email: 'test@test.com', password: '1234' };

        service.login(mockRequest).subscribe();

        const req = httpMock.expectOne(`${baseUrl}/login`);
        expect(req.request.method).toBe('POST');

        req.flush({ success: true, role: Role.USER });
    });

    // =========================
    // SET TOKEN
    // =========================
    it('should set token when login success', () => {

        const response: any = { success: true, role: Role.USER };

        service.setToken(response, 'password123');

        const user = service.getUser();

        expect(user).not.toBeNull();
        expect(user?.password).toBe('password123');
    });

    // =========================
    // LOGIN STATE
    // =========================
    it('should return logged in state', () => {

        service.setCurrentUser({ success: true, role: Role.USER } as any);

        expect(service.isLoggedIn()).toBe(true);
    });

    // =========================
    // ROLE CHECKS
    // =========================
    it('should detect admin role', () => {

        service.setCurrentUser({ success: true, role: Role.ADMIN } as any);

        expect(service.isAdmin()).toBe(true);
        expect(service.isUser()).toBe(false);
    });

    it('should detect user role', () => {

        service.setCurrentUser({ success: true, role: Role.USER } as any);

        expect(service.isUser()).toBe(true);
        expect(service.isAdmin()).toBe(false);
    });

    // =========================
    // LOGOUT
    // =========================
    it('should logout user', () => {

        service.setCurrentUser({ success: true, role: Role.USER } as any);

        service.logout();

        expect(service.isLoggedIn()).toBe(false);
    });

    afterEach(() => {
        httpMock.verify();
    });
});