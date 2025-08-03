import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { MockAuthService } from '../../mocks/auth.service.mock';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MOCK_USERS } from '../../mocks/user.mock';
import { of } from 'rxjs';
import { MESSAGE_CONSTANTS } from '../../constants/message.constant';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const routerSpy = jasmine.createSpyObj<Router>(['navigate']);
  const loaderSpy = jasmine.createSpyObj<LoaderService>(['show', 'hide']);
  const toastrSpy = jasmine.createSpyObj<ToastrService>(['error']);
  const authServiceSpy = new MockAuthService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: LoaderService, useValue: loaderSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    let loginSpy: jasmine.Spy;

    beforeEach(() => {
      loginSpy = spyOn(component['authService'], 'login').and.returnValues(of(MOCK_USERS[0]));

      component.username = 'admin';
      component.password = 'admin';
    });

    it('should login the user', () => {
      component.login();

      expect(loaderSpy.show).toHaveBeenCalled();
      expect(loginSpy).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(loaderSpy.hide).toHaveBeenCalled();
    });

    it('should not login the user', () => {
      component.username = '';
      component.password = '';

      component.login();

      expect(toastrSpy.error).toHaveBeenCalledWith(MESSAGE_CONSTANTS.REQUIRED_CREDENTIALS);
    });

    it('should login the user', () => {
      loginSpy.and.returnValues(of(undefined));

      component.login();

      expect(toastrSpy.error).toHaveBeenCalledWith(MESSAGE_CONSTANTS.INVALID_CREDENTIALS);
    });
  });
});
