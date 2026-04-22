import { Component, Input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PaymentDto } from '../Dto/PaymentDto';
import { PaymentType } from '../Dto/enums/payment-type';
import { PaymentService } from '../Service/PaymentService';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit {

  @Input() eventPrice: number = 0;
  @Input() eventId: number = 0;
  @Input() ticketQty: number = 1;
  @Input() eventName: string = '';
  @Input() eventLocation: string = '';

  isConfirmed = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  // Inizializzazione corretta con eventId
  paymentObj = signal<PaymentDto>({
    method: PaymentType.PAYPAL, 
    totalPrice: 0,
    date: new Date().toISOString(),
    userId: 1,
    eventId: 0 // Inizializzato a 0
  });

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    // Sincronizziamo i dati appena il componente carica
    this.paymentObj.update(p => ({
      ...p,
      totalPrice: this.eventPrice * this.ticketQty,
      eventId: this.eventId // Impostiamo l'ID evento ricevuto dall'input
    }));
  }

  setPrice(prezzo: number) {
    this.paymentObj.update(p => ({ ...p, totalPrice: prezzo }));
  }

  savePayment() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    const payload = this.paymentObj(); 

    console.log("Invio al backend:", payload);

    this.paymentService.createPayment(payload).subscribe({
      next: (res) => {
        this.isConfirmed.set(true);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error("Errore:", err);
        alert("Errore durante il salvataggio.");
        this.isSubmitting.set(false);
      }
    });
  }

  resetForm() {
    this.isConfirmed.set(false);
    this.isSubmitting.set(false);
    // Reset mantenendo l'ID evento corrente
    this.paymentObj.set({
      method: PaymentType.PAYPAL,
      totalPrice: this.eventPrice * this.ticketQty, // Ricalcoliamo il prezzo
      date: new Date().toISOString(),
      userId: 1,
      eventId: this.eventId 
    });
  }
}