import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../Service/TicketService';
import { TicketDto } from '../Dto/TicketDto';

@Component({
  selector: 'app-admin-tickets',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-tickets-component.html',
  styleUrl: './admin-tickets-component.css',
})
export class AdminTicketsComponent {

  private ticketService = inject(TicketService);

  tickets = signal<TicketDto[]>([]);

  // =========================
  // FILTRI
  // =========================

  name: string = '';
  surname: string = '';

  price: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  date: string = '';

  // =========================
  // FILTRO PRINCIPALE
  // =========================

  applyFilters() {

    // NOME + COGNOME
    if (this.name || this.surname) {
      this.ticketService.findByNameAndSurname(this.name, this.surname)
        .subscribe((res: TicketDto[]) => this.tickets.set(res));
      return;
    }

    // RANGE PREZZO
    if (this.minPrice != null || this.maxPrice != null) {
      this.ticketService.findByPriceRange(
        this.minPrice ?? 0,
        this.maxPrice ?? 999999
      ).subscribe((res: TicketDto[]) => this.tickets.set(res));
      return;
    }

    // DATA SINGOLA
   if (this.date) {
  const formattedDate = this.date + "T00:00:00";

  this.ticketService.findByCreationDate(formattedDate)
    .subscribe(res => this.tickets.set(res));
  return;
}

    // PREZZO SINGOLO
    if (this.price != null) {
      this.ticketService.findByPriceGreater(this.price)
        .subscribe((res: TicketDto[]) => this.tickets.set(res));
    }
  }

  // =========================
  // FILTRI RAPIDI
  // =========================

  filterSold() {
  this.ticketService.findByStatus('SOLD')
    .subscribe((res: TicketDto[]) => this.tickets.set(res));
}

filterAvailable() {
  this.ticketService.findByStatus('AVAILABLE')
    .subscribe((res: TicketDto[]) => this.tickets.set(res));
}

  // =========================
  // RESET
  // =========================

  reset() {
    this.tickets.set([]);

    this.name = '';
    this.surname = '';

    this.price = null;
    this.minPrice = null;
    this.maxPrice = null;

    this.date = '';
  }
}