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

  
  paymentObj = signal<PaymentDto>({
    method: PaymentType.PAYPAL, // Metti un default valido
    totalPrice: 0,
    date: new Date().toISOString(),
    userId: 1
  });

  constructor(private paymentService: PaymentService) {}

  savePayment() {
    // Usiamo il valore attuale del segnale
    const payload = this.paymentObj(); 

    this.paymentService.createPayment(payload).subscribe({
      next: (res) => {
        alert("Pagamento salvato con successo!");
        this.resetForm();
      },
      error: (err) => {
        console.error("Errore:", err);
        alert("Errore durante il salvataggio.");
      }
    });
  }

  resetForm() {
    this.paymentObj.set({
      method: PaymentType.PAYPAL,
      totalPrice: 0,
      date: new Date().toISOString(),
      userId: 1
    });
  }
}