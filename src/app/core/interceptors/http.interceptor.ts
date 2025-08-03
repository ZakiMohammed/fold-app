import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MESSAGE_CONSTANTS } from '../constants/message.constant';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastrService);

  return next(handleRequest(req, authService)).pipe(
    catchError((err) => handleAuthError(err, authService, toastService)),
  );
};

const handleRequest = (req: HttpRequest<unknown>, authService: AuthService) => {
  let clonedReq = req;

  if (authService.user) {
    const user = {
      id: authService.user.id,
      username: authService.user.username,
      email: authService.user.email,
    };
    clonedReq = req.clone({
      setHeaders: {
        'X-User': JSON.stringify(user),
      },
    });
  }

  return clonedReq;
};

const handleAuthError = (err: HttpErrorResponse, authService: AuthService, toastService: ToastrService) => {
  if (err instanceof HttpErrorResponse) {
    if (err.status === 0) {
      toastService.error(MESSAGE_CONSTANTS.SERVER_DOWN);
      authService.logout();
    } else if (err.status === HttpStatusCode.Unauthorized && !err.url?.includes('login')) {
      toastService.error(MESSAGE_CONSTANTS.SESSION_EXPIRED);
      authService.logout();
    } else {
      toastService.error(MESSAGE_CONSTANTS.GLOBAL_ERROR);
    }
  }
  return throwError(() => err);
};
