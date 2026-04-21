import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractService } from "./abstract-service";
import { Observable } from "rxjs";
import { EventDto } from "../Dto/EventDto";

@Injectable({
    providedIn: 'root'
})
export class EventService extends AbstractService<EventDto> {

    private baseProjectUrl: string;

    constructor(http: HttpClient) {
        super(http);
        this.type = 'Event';
        this.baseProjectUrl = this.baseUrl + '/' + this.type;
    }

    getAllEvents(): Observable<string> {
        return this.http.get<string>(this.baseUrl + '/' + this.type + '/getall');
    }

    // 🔹 findByName
    findByName(name: string): Observable<EventDto> {
        let params = new HttpParams().set('name', name);

        return this.http.get<EventDto>(
            `${this.baseProjectUrl}/findByName`,
            { params }
        );
    }

    // 🔹 findByDescription
    findByDescription(description: string): Observable<EventDto> {
        let params = new HttpParams().set('description', description);

        return this.http.get<EventDto>(
            `${this.baseProjectUrl}/findByDescription`,
            { params }
        );
    }

    // 🔹 findByType
    findByType(type: string): Observable<EventDto[]> {
        let params = new HttpParams().set('type', type);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findByType`,
            { params }
        );
    }

    // 🔹 findByLocation
    findByLocation(location: string): Observable<EventDto[]> {
        let params = new HttpParams().set('location', location);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findByLocation`,
            { params }
        );
    }

    // 🔹 findByDateBetween
    findByDataBetween(startDate: string, endDate: string): Observable<EventDto[]> {
        let params = new HttpParams()
            .set('startDate', startDate)
            .set('endDate', endDate);
        return this.http.get<EventDto[]>(`${this.baseProjectUrl}/findByDataBetween`, { params });
    }

    // 🔹 findByDateAfter
    findByDataAfter(date: string): Observable<EventDto[]> {
        let params = new HttpParams().set('data', date); // ← "data" non "date"
        return this.http.get<EventDto[]>(`${this.baseProjectUrl}/findByDataAfter`, { params });
    }

    // 🔹 findByDateBefore
    findByDataBefore(date: string): Observable<EventDto[]> {
        let params = new HttpParams().set('data', date); // ← "data" non "date"
        return this.http.get<EventDto[]>(`${this.baseProjectUrl}/findByDataBefore`, { params });
    }

    // 🔹 findBySelledTickets
    findBySelledTickets(selledTickets: number): Observable<EventDto[]> {
        let params = new HttpParams().set('selledTickets', selledTickets);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findBySelledTickets`,
            { params }
        );
    }

    // 🔹 findBySelledTicketsLessThan
    findBySelledTicketsLessThan(selledTickets: number): Observable<EventDto[]> {
        let params = new HttpParams().set('selledTickets', selledTickets);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findBySelledTicketsLessThan`,
            { params }
        );
    }

    // 🔹 findBySelledTicketsGreaterThan
    findBySelledTicketsGreaterThan(selledTickets: number): Observable<EventDto[]> {
        let params = new HttpParams().set('selledTickets', selledTickets);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findBySelledTicketsGreaterThan`,
            { params }
        );
    }

    // 🔹 findByTicketPrice
    findByTicketPrice(ticketPrice: number): Observable<EventDto[]> {
        let params = new HttpParams().set('ticketPrice', ticketPrice);

        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findByTicketPrice`,
            { params }
        );
    }

    // 🔹 Top 5 eventi più remunerativi
    findTop5MostRemunerative(): Observable<EventDto[]> {
        return this.http.get<EventDto[]>(
            `${this.baseProjectUrl}/findTop5MostRemunerative`
        );
    }

}