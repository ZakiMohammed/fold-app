import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.authorized().pipe(
    map((result) => {
      if (result) {
        return true;
      } else {
        authService.logout();
        return false;
      }
    }),
    catchError(() => of(false)),
  );
};
