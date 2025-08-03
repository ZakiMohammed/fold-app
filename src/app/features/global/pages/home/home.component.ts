import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../../../core/constants/core.constant';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  appConstants = APP_CONSTANTS;
}
