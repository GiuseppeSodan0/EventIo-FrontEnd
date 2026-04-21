import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDto } from '../Dto/PaymentDto';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) { }

  //1. POST: Per creare un nuovo pagamento
  createPayment(payment: PaymentDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(this.apiUrl, payment);
  }

  //2. GET: Trova pagamenti per metodo (corrisponde al findByMethod del backend)
  findByMethod(method: string): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/method/${method}`);
  }

  //3. GET: Trova pagamenti per utente (corrisponde al findByUserId del backend)
  findByUserId(userId: number): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/user/${userId}`);
  }
}