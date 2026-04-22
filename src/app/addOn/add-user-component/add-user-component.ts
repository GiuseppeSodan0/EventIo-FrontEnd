import { Component, input,Output,EventEmitter } from '@angular/core';
import { userService } from '../../Service/user-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDto } from '../../Dto/UserDto';
import { CommonModule } from '@angular/common';
import { Role } from '../../Dto/enums/user-type';

@Component({
  selector: 'app-add-user-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.css',
})
export class AddUserComponent {
  roles: Role[] = [Role.USER];
  
  constructor(private service: userService){}

  successMessage: string = '';
  errorMessage: string = '';

  userForm = new FormGroup({
    name: new FormControl('', {nonNullable: true,validators: [Validators.required],}),
    surname: new FormControl('', {nonNullable:true,validators: [Validators.required],}),
    email: new FormControl('',{nonNullable:true,validators: [Validators.required]},),
    password: new FormControl('',{nonNullable:true,validators:[Validators.required]}),
    dateOfBirth: new FormControl('',{nonNullable:true,validators:[Validators.required]}),
    role: new FormControl<Role>(Role.USER, {nonNullable: true}),
  });

  count = input<number>(0);

  @Output() countValue = new EventEmitter<UserDto>();

  sendCount(userDto: UserDto){
    this.countValue.emit(userDto);
  }

  onSubmit(): void{
    if(this.userForm.invalid) return;

    const name = this.userForm.get('name')!.value;
    const surname = this.userForm.get('surname')!.value;
    const email = this.userForm.get('email')!.value;
    const password = this.userForm.get('password')!.value;
    const dateOfBirth = this.userForm.get('dateOfBirth')!.value;
    const role = this.userForm.get('role')!.value;
  


    const newUser = new UserDto(
      null,
      name,
      surname,
      email,
      password,
      new Date(dateOfBirth),
      role
    );
    

    this.service.register(newUser).subscribe({
      next: () => {
        this.userForm.reset();
        newUser.id = this.count().valueOf() + 1;
        newUser.name = newUser.name[0].toUpperCase() + newUser.name.slice(1);
        newUser.surname = newUser.surname[0].toUpperCase() + newUser.surname.slice(1);
        newUser.dateOfBirth = new Date(dateOfBirth);
        newUser.email = newUser.email.trim().toLowerCase();
        this.sendCount(newUser);
      },
      error: (err: any) => console.error(err),
    });

  }


  
}
