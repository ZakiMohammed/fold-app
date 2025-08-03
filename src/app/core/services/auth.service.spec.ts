import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_CONSTANTS } from '../constants/local-storage.constant';
import { MOCK_USERS } from '../mocks/user.mock';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  const routerSpy = jasmine.createSpyObj<Router>(['navigate']);
  const httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should logout', () => {
    service.logout();
    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(window.localStorage.getItem(LOCAL_STORAGE_CONSTANTS.USER_KEY)).toBeFalsy();
  });

  describe('user', () => {
    it('should get user', () => {
      const localStorageSpy = spyOn(window.localStorage, 'getItem').and.returnValue(JSON.stringify(MOCK_USERS[0]));

      const currentUser = service.user;

      expect(localStorageSpy).toHaveBeenCalled();
      expect(currentUser).toEqual(MOCK_USERS[0]);
    });

    it('should not get user', () => {
      const localStorageSpy = spyOn(window.localStorage, 'getItem').and.returnValue(null);

      const currentUser = service.user;

      expect(localStorageSpy).toHaveBeenCalled();
      expect(currentUser).toBeNull();
    });

    it('should not get user in case of exception', () => {
      const localStorageSpy = spyOn(window.localStorage, 'getItem').and.returnValue('Invalid JSON');
      const consoleSpy = spyOn(window.console, 'log');

      const currentUser = service.user;

      expect(localStorageSpy).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
      expect(currentUser).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return true if logged in', () => {
      // arrange
      const userSpy = spyOnProperty(service, 'user', 'get').and.returnValue(MOCK_USERS[0]);
      // act
      const result = service.isLoggedIn;
      // assert
      expect(userSpy).toHaveBeenCalled();
      expect(result).toBeTrue();
    });

    it('should return false if not logged in', () => {
      const userSpy = spyOnProperty(service, 'user', 'get').and.returnValue(null);
      const result = service.isLoggedIn;
      expect(userSpy).toHaveBeenCalled();
      expect(result).toBeFalse();
    });
  });

  describe('authorized', () => {
    let userSpy: jasmine.Spy;
    let getSpy: jasmine.Spy;

    beforeEach(() => {
      userSpy = jasmine.createSpy();
      getSpy = jasmine.createSpy();
    });

    it('should return true if authorized', () => {
      // arrange
      userSpy = spyOnProperty(service, 'user', 'get').and.returnValue(MOCK_USERS[0]);
      getSpy = httpClientSpy.get.and.returnValue(of(MOCK_USERS[0]));
      // act
      const result$ = service.authorized();
      // assert
      expect(userSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalled();
      result$.subscribe((result) => expect(result).toBeTrue());
    });

    it('should return false if authorized', () => {
      // arrange
      userSpy = spyOnProperty(service, 'user', 'get').and.returnValue(null);
      // act
      const result$ = service.authorized();
      // assert
      expect(userSpy).toHaveBeenCalled();
      result$.subscribe((result) => expect(result).toBeFalse());
    });
  });

  describe('login', () => {
    let getSpy: jasmine.Spy;

    beforeEach(() => {
      getSpy = jasmine.createSpy();
    });

    it('should login', () => {
      // arrange
      const username = 'Bret';
      const email = 'Sincere@april.biz';
      getSpy = httpClientSpy.get.and.returnValue(of(MOCK_USERS));
      // act
      const result$ = service.login(username, email);
      // assert
      expect(getSpy).toHaveBeenCalled();
      result$.subscribe((result) => {
        expect(result).toBeTruthy();
        expect(result?.username).toEqual(username);
        expect(result?.email).toEqual(email);
      });
    });

    it('should not login', () => {
      // arrange
      const username = 'admin';
      const email = 'admin';
      getSpy = httpClientSpy.get.and.returnValue(of(MOCK_USERS));
      // act
      const result$ = service.login(username, email);
      // assert
      expect(getSpy).toHaveBeenCalled();
      result$.subscribe((result) => {
        expect(result).toBeFalsy();
      });
    });
  });
});
