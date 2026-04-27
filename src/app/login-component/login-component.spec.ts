import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginComponent } from './login-component';
import { AuthService } from '../Service/auth-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginResponseDto } from '../Dto/LoginResponseDto';
import { Role } from '../Dto/enums/user-type';

describe('LoginComponent', () => {
  let component: LoginComponent;

  const authServiceMock = {
    login: vi.fn(),
    setToken: vi.fn(),
    getUser: vi.fn(() => ({ id: 1 })),
  } as unknown as AuthService;

  const routerMock = {
    navigate: vi.fn(),
  } as unknown as Router;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new LoginComponent(authServiceMock, routerMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if form is invalid', () => {
    component.loginForm.setValue({
      email: '',
      password: '',
    });

    component.onSubmit();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });

  it('should call login and navigate on success', () => {
    component.loginForm.setValue({
      email: 'test@test.com',
      password: '123456',
    });

    const mockResponse: LoginResponseDto = {
      id: 1,
      name: 'Mario',
      surname: 'Rossi',
      email: 'test@test.com',
      role: Role.USER,
      status: true,
    };

    authServiceMock.login = vi.fn(() => of(mockResponse));

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '123456',
    });

    expect(authServiceMock.setToken).toHaveBeenCalledWith(
      mockResponse,
      '123456'
    );

    expect(routerMock.navigate).toHaveBeenCalledWith(['/user-area']);
  });

  it('should show alert on login error', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    component.loginForm.setValue({
      email: 'test@test.com',
      password: 'wrong',
    });

    authServiceMock.login = vi.fn(() =>
      throwError(() => new Error('Invalid credentials'))
    );

    component.onSubmit();

    expect(alertMock).toHaveBeenCalledWith('Credenziali non valide');

    alertMock.mockRestore();
  });
});