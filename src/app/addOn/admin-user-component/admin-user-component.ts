import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../../Service/user-service';
import { UserDto } from '../../Dto/UserDto';

@Component({
  selector: 'app-admin-user-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-component.html',
  styleUrl: './admin-user-component.css',
})
export class AdminUserComponent implements OnInit{

  private userService = inject(userService);

  users: UserDto[] = [];

  loadUsers() {
    // usa un endpoint tuo (se manca lo aggiungiamo)
    this.userService.findByName('').subscribe(res => {
      this.users = Array.isArray(res) ? res : [res];
    });
  }

  ngOnInit() {
    this.loadUsers();
  }
}