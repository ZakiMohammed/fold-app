import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fold-button',
  imports: [],
  templateUrl: './fold-button.component.html',
  styleUrl: './fold-button.component.scss',
})
export class FoldButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() classNames = 'btn btn-outline-secondary ms-1';
  @Input() iconClassNames = '';
  @Input() text = '';
  @Output() buttonClick = new EventEmitter<Event>();

  onButtonClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}
