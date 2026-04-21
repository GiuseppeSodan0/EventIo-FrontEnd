import { HttpClient } from "@angular/common/http";
import { UserDto } from "./UserDto";

export class userService extends AbstractService<UserDto>{
    constructor(http: HttpClient){
        super(http);
        this.type = 'User';
    }
}