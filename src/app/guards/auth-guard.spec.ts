import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth-guard';
import { AuthService } from '../Service/auth-service';
import { vi } from 'vitest';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {

    authServiceMock = {
      isLoggedIn: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if user is logged in', () => {

    authServiceMock.isLoggedIn.mockReturnValue(true);

    const result = guard.canActivate();

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect to login if user is NOT logged in', () => {

    authServiceMock.isLoggedIn.mockReturnValue(false);

    const result = guard.canActivate();

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});