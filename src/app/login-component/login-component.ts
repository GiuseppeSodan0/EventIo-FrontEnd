import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';
import { LoginRequestDto } from '../Dto/LoginRequestDto';
import { LoginResponseDto } from '../Dto/LoginResponseDto';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
        console.log('Full response:', JSON.stringify(response));
        console.log('Login response:', response);
        console.log('response.status:', response.status);
        this.authService.setToken(response, password);
        console.log('User saved to storage:', this.authService.getUser());
        this.router.navigate(['/user-area']);
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Credenziali non valide');
      },
    });
  }
}