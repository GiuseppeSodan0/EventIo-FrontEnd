import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Service/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

 canActivate(): boolean {
  console.log("--- DEBUG: Il Browser sta tentando di accedere a una rotta protetta ---");
  
  const isLogged = this.authService.isLoggedIn();
  console.log("--- DEBUG: AuthGuard ha chiesto al servizio se l'utente è loggato. Risposta:", isLogged);

  if (isLogged) {
    console.log("--- DEBUG: Accesso consentito ---");
    return true;
  } else {
    console.log("--- DEBUG: Accesso NEGATO! Reindirizzamento al login ---");
    this.router.navigate(['/login']);
    return false;
  }
}
}