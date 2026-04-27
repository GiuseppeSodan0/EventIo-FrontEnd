import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ForgotPasswordComponent } from './forgot-password-component';
import { AuthService } from '../Service/auth-service';
import { of, throwError } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;

  const authServiceMock = {
    forgotPassword: vi.fn(),
  } as unknown as AuthService;

  beforeEach(() => {
    component = new ForgotPasswordComponent(authServiceMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call service if form is invalid', () => {
    component.form.setValue({ email: '' });

    component.onSubmit();

    expect(authServiceMock.forgotPassword).not.toHaveBeenCalled();
  });

  it('should call forgotPassword and set sent = true on success', () => {
    component.form.setValue({ email: 'test@test.com' });

    authServiceMock.forgotPassword = vi.fn(() => of({}));

    component.onSubmit();

    expect(authServiceMock.forgotPassword).toHaveBeenCalledWith('test@test.com');
    expect(component.sent).toBe(true);
    expect(component.error).toBe('');
  });

  it('should set error message on failure', () => {
    component.form.setValue({ email: 'test@test.com' });

    authServiceMock.forgotPassword = vi.fn(() =>
      throwError(() => ({ error: { error: 'Errore server' } }))
    );

    component.onSubmit();

    expect(authServiceMock.forgotPassword).toHaveBeenCalledWith('test@test.com');
    expect(component.sent).toBe(false);
    expect(component.error).toBe('Errore server');
  });

  it('should use default error message if backend error is missing', () => {
    component.form.setValue({ email: 'test@test.com' });

    authServiceMock.forgotPassword = vi.fn(() =>
      throwError(() => ({}))
    );

    component.onSubmit();

    expect(component.error).toBe('Errore durante l\'invio');
  });
});