import { TestBed } from '@angular/core/testing';
import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { httpInterceptor } from './http.interceptor';
import { MockAuthService } from '../mocks/auth.service.mock';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mocks/user.mock';
import { MockToastrService } from '../mocks/toastr.service.mock';
import { MESSAGE_CONSTANTS } from '../constants/message.constant';

describe('httpInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => TestBed.runInInjectionContext(() => httpInterceptor(req, next));

  const authServiceSpy = new MockAuthService();
  const toastrSpy = new MockToastrService();

  let next: HttpHandlerFn;
  let req: HttpRequest<unknown>;
  let userSpy: jasmine.Spy;
  let errorSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    });
  });

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next = (req: HttpRequest<unknown>) => {
      const res = {
        body: MOCK_USERS[0],
        status: 200,
        url: 'http://localhost:4200/api/users',
      } as HttpResponse<User>;
      return of(res);
    };
    req = new HttpRequest('GET', 'http://localhost:4200/api/users');
    userSpy = spyOnProperty(authServiceSpy, 'user', 'get').and.returnValue(MOCK_USERS[0]);
    errorSpy = spyOn(toastrSpy, 'error');
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept the request', () => {
    const result$ = interceptor(req, next);

    expect(userSpy).toHaveBeenCalled();

    result$.subscribe((res) => {
      const result = res as HttpResponse<User>;
      expect(result).toBeTruthy();
      expect(result.body?.username).toEqual(MOCK_USERS[0].username);
    });
  });

  describe('handleError', () => {
    it('should intercept the request in case of error [500]', () => {
      const resError = new HttpErrorResponse({
        error: MESSAGE_CONSTANTS.GLOBAL_ERROR,
        status: HttpStatusCode.InternalServerError,
        statusText: MESSAGE_CONSTANTS.GLOBAL_ERROR,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next = (req: HttpRequest<unknown>) => throwError(() => resError);

      const result$ = interceptor(req, next);

      expect(userSpy).toHaveBeenCalled();

      result$.subscribe({
        error: (res) => {
          const result = res as HttpErrorResponse;
          expect(result).toBeTruthy();
          expect(result.status).toEqual(500);
          expect(result.error).toEqual(MESSAGE_CONSTANTS.GLOBAL_ERROR);
          expect(errorSpy).toHaveBeenCalledWith(MESSAGE_CONSTANTS.GLOBAL_ERROR);
        },
      });
    });

    it('should intercept the request in case of error [401]', () => {
      const resError = new HttpErrorResponse({
        error: MESSAGE_CONSTANTS.SESSION_EXPIRED,
        status: HttpStatusCode.Unauthorized,
        statusText: MESSAGE_CONSTANTS.SESSION_EXPIRED,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next = (req: HttpRequest<unknown>) => throwError(() => resError);

      const result$ = interceptor(req, next);

      expect(userSpy).toHaveBeenCalled();

      result$.subscribe({
        error: (res) => {
          const result = res as HttpErrorResponse;
          expect(result).toBeTruthy();
          expect(result.status).toEqual(401);
          expect(result.error).toEqual(MESSAGE_CONSTANTS.SESSION_EXPIRED);
          expect(errorSpy).toHaveBeenCalledWith(MESSAGE_CONSTANTS.SESSION_EXPIRED);
        },
      });
    });

    it('should intercept the request in case of error [0]', () => {
      const resError = new HttpErrorResponse({
        error: MESSAGE_CONSTANTS.SERVER_DOWN,
        status: 0,
        statusText: MESSAGE_CONSTANTS.SERVER_DOWN,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      next = (req: HttpRequest<unknown>) => throwError(() => resError);

      const result$ = interceptor(req, next);

      expect(userSpy).toHaveBeenCalled();

      result$.subscribe({
        error: (res) => {
          const result = res as HttpErrorResponse;
          expect(result).toBeTruthy();
          expect(result.status).toEqual(0);
          expect(result.error).toEqual(MESSAGE_CONSTANTS.SERVER_DOWN);
          expect(errorSpy).toHaveBeenCalledWith(MESSAGE_CONSTANTS.SERVER_DOWN);
        },
      });
    });
  });
});
