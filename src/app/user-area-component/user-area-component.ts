import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';
import { TicketService } from '../Service/TicketService';
import { LoginResponseDto } from '../Dto/LoginResponseDto';
import { TicketDto } from '../Dto/TicketDto';

@Component({
  selector: 'app-user-area',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-area-component.html',
  styleUrl: './user-area-component.css',
})
export class UserAreaComponent implements OnInit {
  user: (LoginResponseDto & { password?: string }) | null = null;
  tickets: TicketDto[] = [];
  
  editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    surname: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    dateOfBirth: new FormControl('', { nonNullable: true }),
    newPassword: new FormControl(''),
  });
  
  showEditForm = false;

  constructor(
    private authService: AuthService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user?.id) {
      this.loadTickets();
      this.initForm();
    }
  }
  
  loadTickets(): void {
    if (this.user?.id) {
      this.ticketService.findTicketByUserId(this.user.id).subscribe({
        next: (tickets) => this.tickets = tickets,
        error: (err) => console.error('Error loading tickets:', err)
      });
    }
  }
  
  initForm(): void {
    if (this.user) {
      this.editForm.patchValue({
        name: this.user.name || '',
        surname: this.user.surname || '',
        email: this.user.email || '',
      });
    }
  }
  
  toggleEditForm(): void {
    this.showEditForm = !this.showEditForm;
    if (this.showEditForm) {
      this.initForm();
    }
  }
  
  saveProfile(): void {
    console.log('Save profile:', this.editForm.value);
    this.showEditForm = false;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}