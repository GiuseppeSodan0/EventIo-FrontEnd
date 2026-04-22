import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';
import { LoginRequestDto } from '../Dto/LoginRequestDto';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const request: LoginRequestDto = {
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    };

    this.authService.login(request).subscribe({
      next: (response) => {
        this.authService.setToken(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Credenziali non valide');
      },
    });
  }
}