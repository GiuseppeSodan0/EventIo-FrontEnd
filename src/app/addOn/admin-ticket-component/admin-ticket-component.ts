import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Service/TicketService';
import { TicketDto } from '../../Dto/TicketDto';

@Component({
  selector: 'app-admin-ticket-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-ticket-component.html',
  styleUrl: './admin-ticket-component.css',
})
export class AdminTicketComponent {

  private ticketService = inject(TicketService);

  tickets: TicketDto[] = [];

  filterSold() {
    this.ticketService.findByStatus('SOLD')
      .subscribe((res: TicketDto[]) => {
        this.tickets = res;
      });
  }

  filterAvailable() {
    this.ticketService.findByStatus('AVAILABLE')
      .subscribe((res: TicketDto[]) => {
        this.tickets = res;
      });
  }

  reset() {
    this.tickets = [];
  }
}