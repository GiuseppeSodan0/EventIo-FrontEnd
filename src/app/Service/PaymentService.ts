import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDto } from '../Dto/PaymentDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  // URL base per il Checkout (corrisponde al tuo @RequestMapping("/api/checkout"))
  private apiCheckoutUrl = 'http://localhost:8080/api/checkout';
  
  // NOTA: Verifica se questi endpoint esistono ancora nel backend o se vanno spostati su apiCheckoutUrl
  private apiPaymentUrl = 'http://localhost:8080/api/payment'; 

  constructor(private http: HttpClient) { }

  // --- Metodo corretto per l'invio dell'ordine ---
  // Il backend è su /api/checkout e non ha sottopath, quindi puntiamo direttamente all'URL base
  createOrder(payload: any): Observable<String> {
    return this.http.post(this.apiCheckoutUrl, payload, {responseType: 'text'});
  }

  // --- Metodi preesistenti ---
  // Assicurati che questi endpoint esistano nel backend, altrimenti riceverai errori 404 anche qui
  createPayment(payment: PaymentDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(`${this.apiPaymentUrl}/insert`, payment);
  }

  findByMethod(method: string): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiPaymentUrl}/method/${method}`);
  }

  findByUserId(userId: number): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiPaymentUrl}/user/${userId}`);
  }

  getAll(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiPaymentUrl}/getall`);
  }
}