import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.css'
})
export class ForgotPasswordComponent {
  sent = false;
  error = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.forgotPassword(this.form.value.email!).subscribe({
      next: () => this.sent = true,
      error: (err) => this.error = err.error?.error || 'Errore durante l\'invio'
    });
  }
}