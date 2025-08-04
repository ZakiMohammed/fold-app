import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../../../core/constants/core.constant';
import { FoldAnchorComponent } from '../../../../shared/components/fold-anchor/fold-anchor.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FoldAnchorComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  appConstants = APP_CONSTANTS;
}
