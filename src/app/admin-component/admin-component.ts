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
  AdminUserComponent,
  ],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css'
})
export class AdminComponent  {

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}


   modalOpen = false;
  selected: 'events' | 'tickets' | 'users' | null = null;

    private clickCount = 0;
  private clickTimer: any;

  
  openModal(type: 'events' | 'tickets' | 'users') {
    console.log('CLICK:', type);
    this.selected = type;
    this.modalOpen = true;
  }

  
  closeModal() {
    this.modalOpen = false;
    this.selected = null;
  }

handleOverlayClick() {
    this.clickCount++;

    if (this.clickCount === 1) {
      this.clickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, 300);
    }

    if (this.clickCount === 2) {
      this.closeModal();
      clearTimeout(this.clickTimer);
      this.clickCount = 0;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}