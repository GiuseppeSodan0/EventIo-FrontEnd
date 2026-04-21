export class UserDto{

    id?: number | null;

    name: string;

    surname: string;

    email: string;

    password: string;

    dateOfBirth : Date;


    constructor(id:number | null ,name:string,surname:string,email:string,passord:string,dateOfBirth:Date)
    {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = passord;
        this.dateOfBirth = dateOfBirth;
    }

}