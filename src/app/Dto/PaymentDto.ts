import { PaymentType } from "./enums/payment-type";

export interface PaymentDto {
    id?: number;
    method: PaymentType;
    totalPrice: number;
    date: string;
    userId: number;
    eventId?: number;
}