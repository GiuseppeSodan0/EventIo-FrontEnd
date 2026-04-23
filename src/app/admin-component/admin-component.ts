import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';

import { AdminEventComponent } from '../addOn/admin-event-component/admin-event-component';
import { AdminTicketComponent } from '../addOn/admin-ticket-component/admin-ticket-component';
import { AdminUserComponent } from '../addOn/admin-user-component/admin-user-component';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminEventComponent,
    AdminTicketComponent,
    AdminUserComponent
  ],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css'
})
export class AdminComponent {

  view: 'dashboard' | 'events' | 'tickets' | 'users' = 'dashboard';

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  goTo(view: 'events' | 'tickets' | 'users') {
    this.view = view;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}