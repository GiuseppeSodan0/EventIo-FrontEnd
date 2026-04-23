// navbar-user.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar-user.html',
  styleUrl: './navbar-user.css'
})
export class NavbarUserComponent {}