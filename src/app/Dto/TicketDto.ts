export class TicketDto {
  id?: number;
  name: string;
  surname: string;
  price: number;
  creation_date: string;

  userId: number;
  eventId: number;

  // 🔥 AGGIUNTO per UI (NON BACKEND)
  eventName?: string;

  constructor(
    name: string,
    surname: string,
    price: number,
    creation_date: string,
    userId: number,
    eventId: number,
    id: number = 0
  ) {
    this.name = name;
    this.surname = surname;
    this.price = price;
    this.creation_date = creation_date;
    this.userId = userId;
    this.eventId = eventId;
    this.id = id;
  }
}