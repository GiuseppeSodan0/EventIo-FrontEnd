import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { userService } from './user-service';
import { UserDto } from '../Dto/UserDto';
import { Role } from '../Dto/enums/user-type';

describe('userService', () => {
    let service: userService;
    let httpMock: HttpTestingController;

    const baseUrl = 'http://localhost:8080'; // se AbstractService usa altro, cambia qui

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [userService]
        });

        service = TestBed.inject(userService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get all users', () => {
        const mockUsers: UserDto[] = [
            {
                id: 1,
                name: 'Mario',
                surname: 'Rossi',
                email: 'mario@test.com',
                password: '123',
                dateOfBirth: new Date(),
                role: Role.USER
            }
        ];

        service.getAll().subscribe(users => {
            expect(users.length).toBe(1);
            expect(users[0].name).toBe('Mario');
        });

        const req = httpMock.expectOne(`${service['baseUrl']}/getall`);
        expect(req.request.method).toBe('GET');
        req.flush(mockUsers);
    });

    it('should find by name', () => {
        const mockUser: UserDto = {
            id: 1,
            name: 'Mario',
            surname: 'Rossi',
            email: 'test@test.com',
            password: '123',
            dateOfBirth: new Date(),
            role: Role.USER
        };

        service.findByName('Mario').subscribe(res => {
            expect(res.name).toBe('Mario');
        });

        const req = httpMock.expectOne(
            `${service['baseUrl']}/findByName?name=Mario`
        );

        expect(req.request.method).toBe('GET');
        req.flush(mockUser);
    });

    it('should find by surname and email', () => {
        const mockUser: UserDto = {
            id: 1,
            name: 'Mario',
            surname: 'Rossi',
            email: 'test@test.com',
            password: '123',
            dateOfBirth: new Date(),
            role: Role.USER
        };

        service.findBySurnameAndEmail('Rossi', 'test@test.com').subscribe(res => {
            expect(res.email).toBe('test@test.com');
        });

        const req = httpMock.expectOne((request) =>
            request.url.includes('/findBySurnameAndEmail')
        );

        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('surname')).toBe('Rossi');
        expect(req.request.params.get('email')).toBe('test@test.com');

        req.flush(mockUser);
    });

    it('should register user', () => {
        const dto: UserDto = {
            id: null,
            name: 'Mario',
            surname: 'Rossi',
            email: 'test@test.com',
            password: '123',
            dateOfBirth: new Date(),
            role: Role.USER
        };

        service.register(dto).subscribe(res => {
            expect(res).toBeTruthy();
        });

        const req = httpMock.expectOne('http://localhost:8080/auth/register');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(dto);

        req.flush({ ok: true });
    });
});