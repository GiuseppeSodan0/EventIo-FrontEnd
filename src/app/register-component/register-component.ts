import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from '../addOn/add-user-component/add-user-component';
@Component({
  selector: 'app-register-component',
  imports: [CommonModule, AddUserComponent],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.css'],
})
export class RegisterComponent {
  onUserRegistered(user: any) {
    alert('Registrazione avvenuta con successo!');
  }
}
