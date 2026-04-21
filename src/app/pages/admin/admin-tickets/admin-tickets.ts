import { Component, OnInit, signal } from '@angular/core';
import { TicketService } from '../../../Service/TicketService';
import { TicketDto } from '../../../Dto/TicketDto';

@Component({
  selector: 'app-admin-tickets',
  imports: [],
  templateUrl: './admin-tickets.html',
  styleUrl: './admin-tickets.css',
})
export class AdminTickets implements OnInit {

  //N.B.lista ticket reale dabackend
  tickets = signal<TicketDto[]>([]);

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    //N.B. chiamata API reale backend
    this.ticketService.getAll().subscribe({
      next: (data: TicketDto[]) => {
        this.tickets.set(data);
      },
      error: (err: any) => console.error(err)
    });
  }

  // N.B.filtro base per status
  filterSold() {
    this.tickets.set(this.tickets().filter(t => t.status === 'SOLD'));
  }

  filterAvailable() {
    this.tickets.set(this.tickets().filter(t => t.status === 'AVAILABLE'));
  }

  reset() {
    this.loadTickets();
  }
}
