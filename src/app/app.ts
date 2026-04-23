import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/internal/operators/filter';
import { NavbarUserComponent } from "./components/navbar-user/navbar-user";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, NavbarUserComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {
  protected readonly title = signal('EventIo-FrontEnd');

    isUserArea = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Controlla l'URL iniziale
    this.checkRoute(this.router.url);

    // Controlla ad ogni cambio di rotta
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.checkRoute(e.urlAfterRedirects);
    });
  }

  private checkRoute(url: string): void {
    // Mostra navbar utente su queste pagine
    this.isUserArea = url.startsWith('/user-area') || url.startsWith('/payments');
  }

}
