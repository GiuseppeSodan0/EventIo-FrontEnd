import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';
import { LoginRequestDto } from '../Dto/LoginRequestDto';
import { LoginResponseDto } from '../Dto/LoginResponseDto';

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

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    
    const request: LoginRequestDto = { email, password };

    this.authService.login(request).subscribe({
      next: (response) => {
        this.authService.setToken(response, password);
        this.router.navigate(['/user-area']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Credenziali non valide');
      },
    });
  }
}