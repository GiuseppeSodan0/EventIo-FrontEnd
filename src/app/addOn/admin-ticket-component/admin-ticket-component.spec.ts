import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { AdminTicketComponent } from './admin-ticket-component';

describe('AdminTicketComponent', () => {
  let component: AdminTicketComponent;
  let fixture: ComponentFixture<AdminTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTicketComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
