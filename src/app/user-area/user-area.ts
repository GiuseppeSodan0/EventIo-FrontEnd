import { Component, inject, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { LoginResponseDto } from '../Dto/LoginResponseDto';

@Component({
  selector: 'app-user-area',
  imports: [CommonModule],
  templateUrl: './user-area.html',
  styleUrl: './user-area.css',
})
export class UserAreaComponent implements AfterViewInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user: LoginResponseDto | null = null;
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.user = this.authService.getUser();
    }, 100);
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}