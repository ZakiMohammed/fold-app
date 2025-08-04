import { Component, Input } from '@angular/core';

@Component({
  selector: 'fold-anchor',
  imports: [],
  templateUrl: './fold-anchor.component.html',
  styleUrl: './fold-anchor.component.scss',
})
export class FoldAnchorComponent {
  @Input() classNames = '';
  @Input() href = '';
  @Input() iconClassNames = '';
  @Input() text = '';
}
