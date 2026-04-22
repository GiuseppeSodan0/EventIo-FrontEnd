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
export class AdminTicketsComponent implements OnInit {

  // MODIFICATO: dati reali + backup
  tickets = signal<TicketDto[]>([]);
  baseTickets = signal<TicketDto[]>([]);

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getAll().subscribe({
      next: (data: TicketDto[]) => {
        this.tickets.set(data);
        this.baseTickets.set(data);
      }
    });
  }

  //il search funziona
  search(event: any) {
    const value = event.target.value.toLowerCase();

    this.tickets.set(
      this.baseTickets().filter(t =>
        t.id?.toString().includes(value) ||
        t.status.toLowerCase().includes(value)
      )
    );
  }

  filterSold() {
    this.tickets.set(
      this.baseTickets().filter(t => t.status === 'SOLD')
    );
  }

  filterAvailable() {
    this.tickets.set(
      this.baseTickets().filter(t => t.status === 'AVAILABLE')
    );
  }

  reset() {
    this.tickets.set([...this.baseTickets()]);
  }
}