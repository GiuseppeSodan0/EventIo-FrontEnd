import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../Service/TicketService';
import { TicketDto } from '../../Dto/TicketDto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-ticket-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-ticket-component.html',
  styleUrl: './admin-ticket-component.css',
})
export class AdminTicketComponent {

  private ticketService = inject(TicketService);

  tickets: TicketDto[] = [];

  selectedTicket: TicketDto | null = null;
  isEditMode = false;

  ngOnInit() {
    this.loadTickets();
  }

  
  loadTickets() {
    this.ticketService.getAll()
      .subscribe(res => this.tickets = res);
  }

  
  newTicket() {
    this.selectedTicket = new TicketDto('', '', 0, '', 0, 0, null);
    this.isEditMode = false;
  }

  
  edit(ticket: TicketDto) {
    this.selectedTicket = { ...ticket };
    this.isEditMode = true;
  }

  
  save() {
    if (!this.selectedTicket) return;

    const request = this.isEditMode
      ? this.ticketService.update(this.selectedTicket)
      : this.ticketService.insert(this.selectedTicket);

    request.subscribe(() => {
      this.loadTickets();
      this.selectedTicket = null;
    });
  }

  
  delete(id: number) {
    this.ticketService.delete(id)
      .subscribe(() => this.loadTickets());
  }

  

  filterSold() {
    this.ticketService.findByPriceGreater(0)
      .subscribe(res => this.tickets = res);
  }

  filterAvailable() {
    this.loadTickets();
  }

  reset() {
    this.loadTickets();
  }
}