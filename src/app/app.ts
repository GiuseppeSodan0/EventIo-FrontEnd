import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './Service/auth-service';
import { CommonModule } from '@angular/common';
import { NavbarUserComponent } from './components/navbar-user/navbar-user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NavbarUserComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
[x: string]: any;

    isUserArea = false;

  

  constructor(
    public auth: AuthService,
    private router: Router
    
  ) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/home']);
  }
}