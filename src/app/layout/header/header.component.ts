import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { APP_CONSTANTS } from '../../core/constants/core.constant';
import { FoldButtonComponent } from '../../shared/components/fold-button/fold-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FoldButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  appConstants = APP_CONSTANTS;

  constructor(private authService: AuthService) {}

  navbarCollapse() {
    document.getElementById('navContent')?.classList.remove('show');
  }

  logout() {
    this.authService.logout();
  }
}
