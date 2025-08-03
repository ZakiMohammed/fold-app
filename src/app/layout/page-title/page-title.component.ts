import { Component } from '@angular/core';
import { PageTitleService } from '../../core/services/page-title.service';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  constructor(private pageTitleService: PageTitleService) {}

  get pageTitle() {
    return this.pageTitleService.pageTitle;
  }

  getCleanTitle(title?: string) {
    return title?.split(' - ')[0];
  }
}
