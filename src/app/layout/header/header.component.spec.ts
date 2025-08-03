import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { MockAuthService } from '../../mocks/auth.service.mock';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const authServiceSpy = new MockAuthService();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const logoutSpy = spyOn(component['authService'], 'logout');
    component.logout();
    expect(logoutSpy).toHaveBeenCalled();
  });

  it('should collapse navbar', () => {
    const navContent = document.getElementById('navContent');
    navContent?.classList.add('show');

    component.navbarCollapse();

    const classExist = navContent?.classList.contains('show');
    expect(classExist).toBeFalse();
  });
});
