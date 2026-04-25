import { Component, Input, OnInit, OnChanges, SimpleChanges, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; 

import { PaymentType } from '../Dto/enums/payment-type';
import { PaymentService } from '../Service/PaymentService';
import { AuthService } from '../Service/auth-service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit, OnChanges {

  @Input() eventPrice: number = 0;
  @Input() eventId: number = 0;
  @Input() ticketQty: number = 1;
  @Input() eventName: string = '';
  @Input() eventLocation: string = '';
  @Input() eventDescription: string = '';
  @Input() eventImage: string = '';
  @Output() purchaseConfirmed = new EventEmitter<void>();
  @Output() goBack = new EventEmitter<void>();

  isConfirmed = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);

  paymentForm!: FormGroup;
  public PaymentType = PaymentType; 
  private currentUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getUser()?.id ?? null;
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ticketQty'] && this.paymentForm) {
      this.rebuildTicketsArray();
      this.updateTotalPrice();
    }
  }

  initForm() {
    this.paymentForm = this.fb.group({
      payment: this.fb.group({
        method: [PaymentType.PAYPAL],
        totalPrice: [this.eventPrice * this.ticketQty],
        date: [new Date().toISOString()],
        userId: [this.currentUserId],
        eventId: [this.eventId],
        cardNumber: [''],
        cardExpiry: [''],
        cardCVV: [''],
        iban: [''],
        accountHolder: ['']
      }),
      tickets: this.fb.array([])
    });

    this.paymentForm.get('payment.method')?.valueChanges.subscribe(method => {
      const cardNum = this.paymentForm.get('payment.cardNumber');
      const expiry = this.paymentForm.get('payment.cardExpiry');
      const cvv = this.paymentForm.get('payment.cardCVV');
      const iban = this.paymentForm.get('payment.iban');
      const holder = this.paymentForm.get('payment.accountHolder');

      [cardNum, expiry, cvv, iban, holder].forEach(c => c?.clearValidators());

      if (method === PaymentType.CREDIT_CARD) {
        cardNum?.setValidators([Validators.required, Validators.pattern('^[0-9]{16}$')]);
        expiry?.setValidators([Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/([0-9]{2})$')]);
        cvv?.setValidators([Validators.required, Validators.pattern('^[0-9]{3}$')]);
      } else if (method === PaymentType.BANK_TRANSFER) {
        iban?.setValidators([Validators.required, Validators.pattern('^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$')]);
        holder?.setValidators([Validators.required]);
      }

      [cardNum, expiry, cvv, iban, holder].forEach(c => c?.updateValueAndValidity());
    });

    this.rebuildTicketsArray();
  }

  onNumericInput(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.paymentForm.get(`payment.${controlName}`)?.setValue(input.value);
  }

  onExpiryInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 2) value = value.substring(0, 2) + '/' + value.substring(2, 4);
    input.value = value;
    this.paymentForm.get('payment.cardExpiry')?.setValue(value);
  }

  get tickets(): FormArray { return this.paymentForm.get('tickets') as FormArray; }

  private rebuildTicketsArray() {
    this.tickets.clear();
    for (let i = 0; i < this.ticketQty; i++) {
      this.tickets.push(this.fb.group({
        name: ['', Validators.required], 
        surname: ['', Validators.required],
        eventId: [this.eventId], 
        price: [this.eventPrice], 
        userId: [this.currentUserId]
      }));
    }
  }

  private updateTotalPrice() {
    this.paymentForm.patchValue({ payment: { totalPrice: this.eventPrice * this.ticketQty } });
  }

  savePayment() {
    if (this.paymentForm.invalid || this.isSubmitting()) return;

    if (this.currentUserId == null) {
      alert('Utente non autenticato. Effettua il login prima di procedere con il pagamento.');
      return;
    }

    this.isSubmitting.set(true);

    const rawValue = this.paymentForm.getRawValue();

    const payload = {
      userId: this.currentUserId,
      eventId: rawValue.payment.eventId,
      totalPrice: rawValue.payment.totalPrice,
      method: rawValue.payment.method,
      date: rawValue.payment.date,
      tickets: rawValue.tickets.map((t: any) => ({
        name: t.name,
        surname: t.surname
      }))
    };

    console.log("Invio payload al server:", payload);

    this.paymentService.createOrder(payload).subscribe({
      next: (res) => { 
        this.isConfirmed.set(true); 
        this.isSubmitting.set(false);
        this.purchaseConfirmed.emit(); // solo questo, NON goBack
      },
      error: (err) => { 
        console.error("Errore durante l'invio:", err); 
        alert("Errore durante l'invio: " + (err.error?.message || "Errore sconosciuto")); 
        this.isSubmitting.set(false); 
      }
    });
  }

  onGoBack() {  // <-- metodo separato per il pulsante indietro
    this.goBack.emit();
  }

  resetForm() {
    this.isConfirmed.set(false);
    this.isSubmitting.set(false);
    this.paymentForm.reset({
      payment: {
        method: PaymentType.PAYPAL,
        totalPrice: this.eventPrice * this.ticketQty,
        date: new Date().toISOString(),
        userId: this.currentUserId,
        eventId: this.eventId,
        cardNumber: '', cardExpiry: '', cardCVV: '', iban: '', accountHolder: ''
      }
    });
    this.rebuildTicketsArray();
  }
}