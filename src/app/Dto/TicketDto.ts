export class TicketDto {
  id?: number;
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
    id: number = 0
  ) {
    this.name = name;
    this.surname = surname;
    this.price = price;
    this.creationDate = creationDate;
    this.userId = userId;
    this.eventId = eventId;
    this.id = id;
  }
}
