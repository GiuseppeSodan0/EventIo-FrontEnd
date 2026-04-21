export class TicketDto {

  id?: number | null;

  eventId: number;

  userId: number;

  quantity: number;

  price: number;

  status: 'SOLD' | 'AVAILABLE';

  purchaseDate: Date;

  constructor(
    eventId: number,
    userId: number,
    quantity: number,
    price: number,
    status: 'SOLD' | 'AVAILABLE',
    purchaseDate: Date,
    id: number | null
  ) {
    this.eventId = eventId;
    this.userId = userId;
    this.quantity = quantity;
    this.price = price;
    this.status = status;
    this.purchaseDate = purchaseDate;
    this.id = id;
  }
}