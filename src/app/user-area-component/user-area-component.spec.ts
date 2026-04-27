import { TestBed } from '@angular/core/testing';
import { UserAreaComponent } from './user-area-component';
import { AuthService } from '../Service/auth-service';
import { TicketService } from '../Service/ticket-service';
import { EventService } from '../Service/event-service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Role } from '../Dto/enums/user-type';
import { vi } from 'vitest';

describe('UserAreaComponent', () => {
    let component: UserAreaComponent;

    let authServiceMock: any;
    let ticketServiceMock: any;
    let eventServiceMock: any;
    let routerMock: any;

    beforeEach(async () => {
        authServiceMock = {
            getUser: vi.fn(),
            logout: vi.fn() // ✅ FIX CRITICO
        };

        ticketServiceMock = {
            findTicketByUserId: vi.fn()
        };

        eventServiceMock = {
            findById: vi.fn()
        };

        routerMock = {
            navigate: vi.fn()
        };

        await TestBed.configureTestingModule({
            imports: [UserAreaComponent],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: TicketService, useValue: ticketServiceMock },
                { provide: EventService, useValue: eventServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        const fixture = TestBed.createComponent(UserAreaComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load user and tickets on init', () => {
        const mockUser = {
            id: 1,
            name: 'Mario',
            surname: 'Rossi',
            email: 'test@test.com',
            role: Role.USER,
            status: true
        };

        authServiceMock.getUser.mockReturnValue(mockUser);

        ticketServiceMock.findTicketByUserId.mockReturnValue(
            of([
                {
                    id: 1,
                    name: 'Mario',
                    surname: 'Rossi',
                    price: 10,
                    creationDate: '2024-01-01',
                    userId: 1,
                    eventId: 100
                }
            ])
        );

        eventServiceMock.findById.mockReturnValue(
            of({
                name: 'Concert',
                date: 123456,
                description: 'Test event'
            })
        );

        component.ngOnInit();

        expect(authServiceMock.getUser).toHaveBeenCalled();
        expect(ticketServiceMock.findTicketByUserId).toHaveBeenCalledWith(1);
    });

    it('should not load tickets if user is null', () => {
        authServiceMock.getUser.mockReturnValue(null);

        component.ngOnInit();

        expect(ticketServiceMock.findTicketByUserId).not.toHaveBeenCalled();
    });

    it('should toggle edit form', () => {
        const mockUser = {
            id: 1,
            name: 'Mario',
            surname: 'Rossi',
            email: 'test@test.com',
            role: Role.USER,
            status: true
        };

        authServiceMock.getUser.mockReturnValue(mockUser);

        component.toggleEditForm();
        expect(component.showEditForm).toBe(true);

        component.toggleEditForm();
        expect(component.showEditForm).toBe(false);
    });

    it('should logout and navigate to login', () => {
        component.logout();

        expect(authServiceMock.logout).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
});