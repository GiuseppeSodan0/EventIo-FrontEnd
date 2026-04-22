import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './Service/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/auth/login')) {
    return next(req);
  }
  
  const authService = inject(AuthService);
  const user = authService.getUser();
  
  if (user && user.email && user.password) {
    const credentials = btoa(`${user.email}:${user.password}`);
    req = req.clone({
      setHeaders: {
        Authorization: `Basic ${credentials}`,
      },
    });
  }
  
  return next(req);
};