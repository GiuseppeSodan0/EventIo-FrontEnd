import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AddUserComponent } from './add-user-component';
import { userService } from '../../Service/user-service';
import { Role } from '../../Dto/enums/user-type';
import { vi } from 'vitest';

describe('AddUserComponent', () => {
  let component: AddUserComponent;

  const userServiceMock = {
    register: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddUserComponent,
        { provide: userService, useValue: userServiceMock },
      ],
    });

    component = TestBed.inject(AddUserComponent);

    vi.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit user on success submit', () => {
    userServiceMock.register.mockReturnValue(of({}));

    vi.spyOn(component, 'count').mockReturnValue(0 as any);
    const emitSpy = vi.spyOn(component.countValue, 'emit');

    component.userForm.setValue({
      name: 'mario',
      surname: 'rossi',
      email: 'test@test.com',
      password: '123456',
      dateOfBirth: '2000-01-01',
      role: Role.USER,
    });

    component.onSubmit();

    expect(userServiceMock.register).toHaveBeenCalled();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not submit invalid form', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.userForm.reset();

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith(
      'Compila tutti i campi obbligatori.'
    );
  });

  it('should handle email already exists (409)', () => {
    userServiceMock.register.mockReturnValue(
      throwError(() => ({ status: 409 }))
    );

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.userForm.setValue({
      name: 'mario',
      surname: 'rossi',
      email: 'test@test.com',
      password: '123456',
      dateOfBirth: '2000-01-01',
      role: Role.USER,
    });

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith(
      'Questa email è già registrata.'
    );
  });

  it('should handle generic error', () => {
    userServiceMock.register.mockReturnValue(
      throwError(() => ({ status: 500 }))
    );

    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.userForm.setValue({
      name: 'mario',
      surname: 'rossi',
      email: 'test@test.com',
      password: '123456',
      dateOfBirth: '2000-01-01',
      role: Role.USER,
    });

    component.onSubmit();

    expect(alertSpy).toHaveBeenCalledWith(
      'Errore durante la registrazione. Riprova più tardi.'
    );
  });
});