import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract-service";
import { TicketDto } from "../Dto/TicketDto";

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AbstractService<TicketDto> {

  constructor(http: HttpClient) {
    super(http);
    this.type = 'Ticket';
  }

  // questo e unextra(se backend diverso da standard)
  findByEvent(eventId: number) {
    return this.http.get<TicketDto[]>(
      this.baseUrl + '/' + this.type + '/event/' + eventId
    );
  }

  findByUser(userId: number) {
    return this.http.get<TicketDto[]>(
      this.baseUrl + '/' + this.type + '/user/' + userId
    );
  }
}