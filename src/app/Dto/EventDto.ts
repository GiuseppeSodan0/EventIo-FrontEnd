export class EventDto {

id?: number | null;
name: string;
description: string;
location : string;
imagePath: string;
date: number;
maxTickets: number;
selledTickets: number;
type: string;
ticketPrice: number;
ticketIds: number[];

constructor (name : string, description: string, location: string,
    imagePath: string,  date : number, maxTickets: number, selledTickets: number,
    type: string, ticketPrice: number, ticketIds: number[], id: number | null) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.imagePath = imagePath;
        this.date = date;
        this.maxTickets = maxTickets;
        this.selledTickets = selledTickets;
        this.type = type;
        this.ticketPrice = ticketPrice;
        this.ticketIds = ticketIds;
        this.id = id;
    }
}
