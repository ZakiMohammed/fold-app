import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mocks/auth.service.mock';
import { Observable, of, throwError } from 'rxjs';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  const authServiceSpy = new MockAuthService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if authorized', () => {
    const spy = spyOn(authServiceSpy, 'authorized').and.returnValue(of(true));
    const guard = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;
    expect(spy).toHaveBeenCalled();
    guard.subscribe((result) => expect(result).toBeTrue());
  });

  it('should return false if not authorized', () => {
    const authorizedSpy = spyOn(authServiceSpy, 'authorized').and.returnValue(of(false));
    const logoutSpy = spyOn(authServiceSpy, 'logout');
    const guard = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;
    expect(authorizedSpy).toHaveBeenCalled();
    guard.subscribe((result) => {
      expect(result).toBeFalse();
      expect(logoutSpy).toHaveBeenCalled();
    });
  });

  it('should handle exception', () => {
    const spy = spyOn(authServiceSpy, 'authorized').and.returnValue(throwError(() => new Error('error')));
    const guard = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>;
    expect(spy).toHaveBeenCalled();
    guard.subscribe((result) => expect(result).toBeFalse());
  });
});
