import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login-component';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { of } from 'rxjs';
import { vi, describe, it, beforeEach, expect } from 'vitest';

describe('LoginComponent (Vitest)', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {

    authServiceMock = {
      login: vi.fn().mockReturnValue(of({ token: 'fake' })),
      setToken: vi.fn(),
      setCurrentUser: vi.fn()
    };

    routerMock = {
      navigate: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate on success', () => {

    component.loginForm.setValue({
      email: 'test@test.com',
      password: '1234'
    });

    component.onSubmit();

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(authServiceMock.setToken).toHaveBeenCalled();
    expect(authServiceMock.setCurrentUser).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/user-area']);
  });

  it('should not submit if form is invalid', () => {

    component.loginForm.setValue({
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });
});