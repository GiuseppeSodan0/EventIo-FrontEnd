export class UserDto{

    

    name: string;

    surname: string;

    email: string;

    password: string;

    dateOfBirth : Date;
    
    id?: number | null;

    constructor(id:number | null ,name:string,surname:string,email:string,passord:string,dateOfBirth:Date)
    {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = passord;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
    }

}