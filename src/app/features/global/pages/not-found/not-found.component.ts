import { Component } from '@angular/core';
import { FoldAnchorComponent } from '../../../../shared/components/fold-anchor/fold-anchor.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FoldAnchorComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
