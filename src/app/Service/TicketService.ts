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

  
  findByNameAndSurname(name: string, surname: string) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/findTicketByNameAndSurname?name=${name}&surname=${surname}`
    );
  }

  
  findByCreationDate(date: string) {
  return this.http.get<TicketDto[]>(
    this.baseUrl + '/Ticket/findTicketByCreationDate?creationDate=' + date
  );
}

  
  findByPriceGreater(price: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/findTicketByPriceGreaterThanEqual?price=${price}`
    );
  }

 
  findByPriceLess(price: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/findTicketByPriceLessThanEqual?price=${price}`
    );
  }

  
  findByPriceRange(min: number, max: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/findTicketByPriceRange?initialPrice=${min}&endPrice=${max}`
    );
  }

 
  findByEvent(eventId: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/event/${eventId}`
    );
  }

  findByStatus(status: string) {
  return this.http.get<TicketDto[]>(
    this.baseUrl + '/Ticket/status/' + status
  );
}

 
  findByUser(userId: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/user/${userId}`
    );
  }
}