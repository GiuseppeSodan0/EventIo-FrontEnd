import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.css'
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  done = false;
  error = '';

  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) this.router.navigate(['/login']);
  }

  onSubmit() {
    /*
    if (this.form.invalid) return;
    const { newPassword, confirmPassword } = this.form.value;
    if (newPassword !== confirmPassword) {
      this.error = 'Le password non coincidono';
      return;
    }
    this.authService.resetPassword(this.token, newPassword!).subscribe({
      next: () => this.done = true,
      error: (err) => this.error = err.error?.error || 'Token non valido o scaduto'
    }); */
    console.log('form valid:', this.form.valid);
  console.log('token:', this.token);
  console.log('form value:', this.form.value);
  
  if (this.form.invalid) return;
  const { newPassword, confirmPassword } = this.form.value;
  if (newPassword !== confirmPassword) {
    this.error = 'Le password non coincidono';
    return;
  }
  this.authService.resetPassword(this.token, newPassword!).subscribe({
    next: (res) => { console.log('res:', res); this.done = true; },
    error: (err) => { console.log('err:', err); this.error = err.error?.error || 'Token non valido o scaduto'; }
  });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}