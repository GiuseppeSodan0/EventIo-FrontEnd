import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NavbarUserComponent } from './navbar-user';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarUserComponent', () => {
  let component: NavbarUserComponent;
  let fixture: ComponentFixture<NavbarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarUserComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarUserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges(); // 🔥 importante (NON usare solo whenStable qui)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});