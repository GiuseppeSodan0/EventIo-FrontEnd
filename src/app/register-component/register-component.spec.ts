import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register-component';
import { vi } from 'vitest';

describe('RegisterComponent', () => {
  let component: RegisterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // mock alert globale
    vi.stubGlobal('alert', vi.fn());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call alert on user registered', () => {
    const alertSpy = vi.spyOn(window, 'alert');

    component.onUserRegistered({
      id: 1,
      name: 'Mario',
    });

    expect(alertSpy).toHaveBeenCalledWith(
      'Registrazione avvenuta con successo!'
    );
  });
});