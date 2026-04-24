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
  this.ticketService.getAll()
    .subscribe((res: any) =>
      this.tickets = res.filter((t: any) => t.status === 'SOLD')
    );
}

filterAvailable() {
  this.ticketService.getAll()
    .subscribe((res: any) =>
      this.tickets = res.filter((t: any) => t.status === 'AVAILABLE')
    );
}

  reset() {
    this.tickets = [];
  }
}