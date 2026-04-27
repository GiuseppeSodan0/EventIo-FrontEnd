import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ResetPasswordComponent } from './reset-password-component';
import { AuthService } from '../Service/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;

  const authServiceMock = {
    resetPassword: vi.fn(),
  } as unknown as AuthService;

  const routerMock = {
    navigate: vi.fn(),
  } as unknown as Router;

  const routeMock = {
    snapshot: {
      queryParamMap: {
        get: vi.fn(),
      },
    },
  } as unknown as ActivatedRoute;

  beforeEach(() => {
    vi.clearAllMocks();

    (routeMock.snapshot.queryParamMap.get as any).mockReturnValue('fake-token');

    component = new ResetPasswordComponent(
      routeMock,
      authServiceMock,
      routerMock
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if token is missing', () => {
    (routeMock.snapshot.queryParamMap.get as any).mockReturnValue(null);

    component.ngOnInit();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set token on init', () => {
    component.ngOnInit();

    expect(component.token).toBe('fake-token');
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({
      newPassword: '',
      confirmPassword: '',
    });

    component.onSubmit();

    expect(authServiceMock.resetPassword).not.toHaveBeenCalled();
  });

  it('should show error if passwords do not match', () => {
    component.token = 't123';

    component.form.setValue({
      newPassword: '123456',
      confirmPassword: '999999',
    });

    component.onSubmit();

    expect(component.error).toBe('Le password non coincidono');
    expect(authServiceMock.resetPassword).not.toHaveBeenCalled();
  });

  it('should call resetPassword and set done=true on success', () => {
    component.token = 't123';

    component.form.setValue({
      newPassword: '123456',
      confirmPassword: '123456',
    });

    authServiceMock.resetPassword = vi.fn(() => of({}));

    component.onSubmit();

    expect(authServiceMock.resetPassword).toHaveBeenCalledWith('t123', '123456');
    expect(component.done).toBe(true);
    expect(component.error).toBe('');
  });

  it('should set error on API failure', () => {
    component.token = 't123';

    component.form.setValue({
      newPassword: '123456',
      confirmPassword: '123456',
    });

    authServiceMock.resetPassword = vi.fn(() =>
      throwError(() => ({ error: { error: 'Token scaduto' } }))
    );

    component.onSubmit();

    expect(component.error).toBe('Token scaduto');
    expect(component.done).toBe(false);
  });

  it('should use default error message if backend error missing', () => {
    component.token = 't123';

    component.form.setValue({
      newPassword: '123456',
      confirmPassword: '123456',
    });

    authServiceMock.resetPassword = vi.fn(() =>
      throwError(() => ({}))
    );

    component.onSubmit();

    expect(component.error).toBe('Token non valido o scaduto');
  });
});