import { Component, inject, signal } from '@angular/core';
import { AddUserComponent } from '../app/addOn/add-user-component/add-user-component';
import { UserDto } from '../app/Dto/UserDto';
import { userService } from '../app/Service/user-service';
@Component({
  selector: 'app-register-component',
  imports: [AddUserComponent],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {


}
