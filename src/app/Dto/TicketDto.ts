export class TicketDto {

  ticketId?: number | null;

  name: string;
  surname: string;

  price: number;

  creationDate: string;

  userId: number;
  eventId: number;

  constructor(
    name: string,
    surname: string,
    price: number,
    creationDate: string,
    userId: number,
    eventId: number,
    ticketId: number | null
  ) {
    this.name = name;
    this.surname = surname;
    this.price = price;
    this.creationDate = creationDate;
    this.userId = userId;
    this.eventId = eventId;
    this.ticketId = ticketId;
  }
}