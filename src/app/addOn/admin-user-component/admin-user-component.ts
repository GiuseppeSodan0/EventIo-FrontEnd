import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userService } from '../../Service/user-service';
import { UserDto } from '../../Dto/UserDto';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin-user-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-component.html',
  styleUrl: './admin-user-component.css',
})
export class AdminUserComponent implements OnInit {

  private userService = inject(userService);

  users: UserDto[] = [];
  filteredUsers: UserDto[] = [];

  search = '';
  roleFilter = 'ALL';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(res => {
      this.users = res;
      this.filteredUsers = res;
    });
  }


  filterUsers() {
    this.filteredUsers = this.users.filter(u => {
      const matchText =
        u.name.toLowerCase().includes(this.search.toLowerCase()) ||
        u.surname.toLowerCase().includes(this.search.toLowerCase()) ||
        u.email.toLowerCase().includes(this.search.toLowerCase());

      const matchRole =
        this.roleFilter === 'ALL' || u.role === this.roleFilter;

      return matchText && matchRole;
    });
  }

  deleteUser(id?: number) {
    if (!id) return;

    this.userService.delete(id).subscribe(() => {
      this.loadUsers();
    });
  }
}