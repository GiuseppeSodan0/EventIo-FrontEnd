import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-user-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-component.html',
  styleUrl: './admin-user-component.css',
})
export class AdminUserComponent {}
users: [] = [];
