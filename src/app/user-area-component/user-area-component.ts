import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { LoginResponseDto } from '../Dto/LoginResponseDto';

@Component({
  selector: 'app-user-area',
  imports: [CommonModule],
  templateUrl: './user-area-component.html',
  styleUrl: './user-area-component.css',
})
export class UserAreaComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  user: (LoginResponseDto & { password?: string }) | null = null;
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
    console.log('User in user-area:', this.user);
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}