import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../../../core/constants/core.constant';
import { FoldAnchorComponent } from '../../../../shared/components/fold-anchor/fold-anchor.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FoldAnchorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  appConstants = APP_CONSTANTS;
}
