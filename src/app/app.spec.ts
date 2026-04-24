import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { App } from './app';

describe('App', () => {
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        App,
        RouterTestingModule // 🔥 FIX per ActivatedRoute / RouterOutlet
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render footer title', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const footerText = compiled.querySelector('.footer p')?.textContent ?? '';

    expect(footerText).toContain('EventIO');
  });
});