import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MESSAGE_CONSTANTS } from '../../../../core/constants/message.constant';
import { LoaderService } from '../../../../core/services/loader.service';
import { AuthService } from '../../../../core/services/auth.service';
import { finalize, map } from 'rxjs';
import { APP_CONSTANTS } from '../../../../core/constants/core.constant';
import { FoldButtonComponent } from '../../../../shared/components/fold-button/fold-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, FoldButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username = '';
  password = '';
  appConstants = APP_CONSTANTS;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
    private authService: AuthService,
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.toastrService.error(MESSAGE_CONSTANTS.REQUIRED_CREDENTIALS);
      return;
    }

    this.loaderService.show();
    this.authService
      .login(this.username, this.password)
      .pipe(
        map((user) => {
          if (user) {
            this.router.navigate(['/']);
          } else {
            this.toastrService.error(MESSAGE_CONSTANTS.INVALID_CREDENTIALS);
          }
          this.loaderService.hide();
        }),
        finalize(() => this.loaderService.hide()),
      )
      .subscribe();
  }
}
