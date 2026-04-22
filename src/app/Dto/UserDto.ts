import { Role } from './enums/user-type';

export class UserDto{

    

    name: string;

    surname: string;

    email: string;

    password: string;

    dateOfBirth : Date;
    
    id?: number | null;

    role: Role;

    constructor(id:number | null ,name:string,surname:string,email:string,password:string,dateOfBirth:Date,role:Role)
    {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
        this.role = role;
    }

}