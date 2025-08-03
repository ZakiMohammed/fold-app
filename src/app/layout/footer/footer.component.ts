import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../core/constants/core.constant';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  appConstants = APP_CONSTANTS;

  get year() {
    return new Date().getFullYear();
  }
}
