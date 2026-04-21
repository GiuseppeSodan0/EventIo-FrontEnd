import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDto } from '../Dto/PaymentDto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  // 1. CORRETTO: rimosso la 's' finale per coincidere con @RequestMapping("/api/payment") del backend
  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private http: HttpClient) { }

  // 2. CORRETTO: punta a '/insert', che è l'endpoint definito nell'AbstractController
  createPayment(payment: PaymentDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(`${this.apiUrl}/insert`, payment);
  }

  // 3. GET: Trova pagamenti per metodo
  findByMethod(method: string): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/method/${method}`);
  }

  // 4. GET: Trova pagamenti per utente
  findByUserId(userId: number): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/user/${userId}`);
  }

  // EXTRA: Dato che il tuo AbstractController espone anche getAll, 
  // ecco come aggiungerlo se ti serve in futuro:
  getAll(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(`${this.apiUrl}/getall`);
  }
}