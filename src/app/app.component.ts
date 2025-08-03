import { Component, signal } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  RouterOutlet,
} from '@angular/router';
import { APP_CONSTANTS } from './core/constants/core.constant';
import { LoaderService } from './core/services/loader.service';
import { PageTitleService } from './core/services/page-title.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './layout/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, LoaderComponent],
})
export class App {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private pageTitleService: PageTitleService,
  ) {
    this.router.events.subscribe((e) => this.navigationInterceptor(e as RouterEvent));
  }

  get loader() {
    return this.loaderService.loader;
  }

  private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loaderService.show();
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loaderService.hide();

      if (event instanceof NavigationEnd) {
        this.updatePageTitle();
      }
    }
  }

  private updatePageTitle() {
    let child = this.getRouteChild();
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (child.snapshot.data && child.snapshot.title !== APP_CONSTANTS.APP_NAME) {
        const title = child.snapshot.title;
        const icon = child.snapshot.data['icon'];
        this.pageTitleService.set({ title, icon });
        break;
      } else {
        this.pageTitleService.set(null);
        break;
      }
    }
  }

  private getRouteChild() {
    return this.route.firstChild;
  }
}
