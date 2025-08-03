import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { loginGuard } from './login.guard';
import { MockAuthService } from '../mocks/auth.service.mock';
import { AuthService } from '../services/auth.service';

describe('loginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  const routerSpy = jasmine.createSpyObj<Router>(['navigate']);
  const authServiceSpy = new MockAuthService();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return false if user is logged in', () => {
    const isLoggedInSpy = spyOnProperty(authServiceSpy, 'isLoggedIn', 'get').and.returnValue(true);
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as boolean;
    expect(isLoggedInSpy).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(result).toBeFalse();
  });

  it('should return true if user is logged in', () => {
    const spy = spyOnProperty(authServiceSpy, 'isLoggedIn', 'get').and.returnValue(false);
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as boolean;
    expect(spy).toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});
