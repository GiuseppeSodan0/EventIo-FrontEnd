import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../Service/TicketService';
import { TicketDto } from '../Dto/TicketDto';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-tickets-component.html',
  styleUrl: './admin-tickets-component.css',
})
export class AdminTickets implements OnInit {

  //N.B.lista ticket reale dabackend
  tickets = signal<TicketDto[]>([]);
  baseTickets = signal<TicketDto[]>([]);

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    //N.B. chiamata API reale backend
    this.ticketService.getAll().subscribe({
      next: (data: TicketDto[]) => {
        this.tickets.set(data);
        this.baseTickets.set(data);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  // N.B.filtro base per status
 filterSold() {
    this.tickets.set(
      this.baseTickets().filter((t: TicketDto) => t.status === 'SOLD')
    );
  }

  filterAvailable() {
    this.tickets.set(
      this.baseTickets().filter((t: TicketDto) => t.status === 'AVAILABLE')
    );
  }

  reset() {
   this.tickets.set([...this.baseTickets()]);
  }
}
