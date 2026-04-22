import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Service/auth-service';
import { LoginResponseDto } from '../Dto/LoginResponseDto';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
})
export class AdminComponent implements OnInit {

  //utente loggato in admin
  user: LoginResponseDto | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getUser();
  }

  //logout centralizzato
  logout(): void {
    this.auth.logout();
  }
}