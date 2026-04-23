import { Component } from '@angular/core';
import { AdminTicketsComponent } from '../admin-tickets-component/admin-tickets-component';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.css',
  imports: [FormsModule, CommonModule, AdminTicketsComponent]
})
export class AdminComponent {

  searchText: string = '';


  view: 'dashboard' | 'events' | 'tickets' = 'dashboard';

  constructor(private router: Router, public auth: AuthService) {}

  //
  goTo(view: 'events' | 'tickets') {
    this.view = view;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onSearch() {
    console.log(this.searchText);
  }
}