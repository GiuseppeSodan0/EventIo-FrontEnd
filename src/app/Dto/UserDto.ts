export class UserDto{

    

    name: string;

    surname: string;

    email: string;

    password: string;

    dateOfBirth : Date;
    
    id?: number | null;

    constructor(name:string,surname:string,email:string,passord:string,dateOfBirth:Date,id:number | null)
    {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = passord;
        this.dateOfBirth = dateOfBirth;
        this.id = id;
    }

}