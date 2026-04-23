import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventComponent } from './admin-event-component';

describe('AdminEventComponent', () => {
  let component: AdminEventComponent;
  let fixture: ComponentFixture<AdminEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminEventComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
