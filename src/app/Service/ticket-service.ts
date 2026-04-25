import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract-service";
import { TicketDto } from "../Dto/TicketDto";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TicketService extends AbstractService<TicketDto> {

  constructor(http: HttpClient) {
    super(http);
    this.type = 'Ticket';
  }

  // =========================
  // OVERRIDE CRUD BASE
  // =========================

  override getAll(): Observable<TicketDto[]> {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/getall`
    );
  }

  override insert(dto: TicketDto): Observable<TicketDto> {
    return this.http.post<TicketDto>(
      `${this.baseUrl}/${this.type}/insert`,
      dto
    );
  }

  override update(dto: TicketDto): Observable<TicketDto> {
    return this.http.put<TicketDto>(
      `${this.baseUrl}/${this.type}/update`,
      dto
    );
  }

  override delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${this.type}/delete?id=${id}`
    );
  }

  // =========================
  // CUSTOM QUERIES
  // =========================

  findByNameAndSurname(name: string, surname: string) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/findTicketByNameAndSurname?name=${name}&surname=${surname}`
    );
  }

  findByCreationDate(date: string) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/Ticket/findTicketByCreationDate?creationDate=${date}`
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
      `${this.baseUrl}/Ticket/status/${status}`
    );
  }

  findByUser(userId: number) {
    return this.http.get<TicketDto[]>(
      `${this.baseUrl}/${this.type}/user/${userId}`
    );
  }
}