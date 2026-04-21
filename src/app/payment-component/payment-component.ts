import { Component, signal } from '@angular/core';
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
export class PaymentComponent {

  isConfirmed = signal<boolean>(false);
  // Aggiunto un flag per bloccare i click multipli
  isSubmitting = signal<boolean>(false);

  paymentObj = signal<PaymentDto>({
    method: PaymentType.PAYPAL, 
    totalPrice: 0, // <--- Questo va aggiornato con il prezzo vero!
    date: new Date().toISOString(),
    userId: 1
  });

  constructor(private paymentService: PaymentService) {}

  // CHIAMA QUESTO METODO APPENA IL COMPONENTE CARICA L'EVENTO
  // Supponendo tu abbia il prezzo dell'evento da qualche parte:
  setPrice(prezzo: number) {
    this.paymentObj.update(p => ({ ...p, totalPrice: prezzo }));
  }

  savePayment() {
    // PROTEZIONE ANTI-CLICK MULTIPLO
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    const payload = this.paymentObj(); 

    console.log("Invio al backend:", payload); // Debug per vedere cosa invii

    this.paymentService.createPayment(payload).subscribe({
      next: (res) => {
        this.isConfirmed.set(true);
        this.isSubmitting.set(false); // Sblocco
      },
      error: (err) => {
        console.error("Errore:", err);
        alert("Errore durante il salvataggio.");
        this.isSubmitting.set(false); // Sblocco anche in caso di errore
      }
    });
  }

  resetForm() {
    this.isConfirmed.set(false);
    this.isSubmitting.set(false);
    this.paymentObj.set({
      method: PaymentType.PAYPAL,
      totalPrice: 0,
      date: new Date().toISOString(),
      userId: 1
    });
  }
}