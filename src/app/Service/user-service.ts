import { HttpClient } from "@angular/common/http";
import { AbstractService } from "./abstract-service";
import { Observable } from "rxjs";
import { UserDto } from "../Dto/UserDto";

export class userService extends AbstractService<UserDto>{
        constructor(http: HttpClient){
        super(http);
        this.type = 'User';
    }

    findByName(name: string): Observable<UserDto>{
    return this.http.get<UserDto>(`${this.baseUrl}/findByName?name=${name}`)
    }
    findBySurname(surname: string): Observable<UserDto>{
    return this.http.get<UserDto>(`${this.baseUrl}/findBySurname?surname=${surname}`)
    }
    findByEmail(email: string): Observable<UserDto>{
    return this.http.get<UserDto>(`${this.baseUrl}/findByEmail?email=${email}`)
    }
    findBySurnameAndEmail(surname: string, email: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/findBySurnameAndEmail`, {
    params: { surname, email }});
    }
    findByNameAndSurname(name: string, surname: string): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.baseUrl}/findByNameAndSurname`, {
    params: { name,surname }});



}



}