import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../Service/TicketService';
import { TicketDto } from '../Dto/TicketDto';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
  imports: [FormsModule, CommonModule]
})
export class AdminComponent {

  // UI STATE
  view: 'dashboard' | 'events' | 'tickets' = 'dashboard';

  // DATA
  tickets: TicketDto[] = [];
  date: string = '';

  private ticketService = inject(TicketService);

  constructor(
    private router: Router,
    public auth: AuthService
  ) {}

  // NAVIGATION UI
  goTo(view: 'events' | 'tickets') {
    this.view = view;
  }

  // LOGOUT
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // =========================
  // TICKET API
  // =========================

  filterSold() {
    this.ticketService.findByStatus('SOLD')
      .subscribe(res => this.tickets = res);
  }

  filterAvailable() {
    this.ticketService.findByStatus('AVAILABLE')
      .subscribe(res => this.tickets = res);
  }

  reset() {
    this.tickets = [];
    this.date = '';
  }
}