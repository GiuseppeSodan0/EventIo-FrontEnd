import { HttpClient } from "@angular/common/http";
import { UserDto } from "../Dto/UserDto";
import { AbstractService } from "./abstract-service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class userService extends AbstractService<UserDto>{
    constructor(http: HttpClient){
        super(http);
        this.type = 'User';
    }
}