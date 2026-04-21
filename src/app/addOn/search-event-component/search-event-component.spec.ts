import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEventComponent } from './search-event-component';

describe('SearchEventComponent', () => {
  let component: SearchEventComponent;
  let fixture: ComponentFixture<SearchEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchEventComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
