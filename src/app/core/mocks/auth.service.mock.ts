import { of } from 'rxjs';
import { User } from '../models/user.model';
import { MOCK_USERS } from './user.mock';

export class MockAuthService {
  get isLoggedIn() {
    return true;
  }

  get user() {
    return MOCK_USERS[0];
  }

  login(username: string, password: string) {
    return of({} as User);
  }

  logout() {}

  authorized() {
    return of(true);
  }
}
