import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loader = signal(false);

  show() {
    this.loader.set(true);
  }

  hide() {
    this.loader.set(false);
  }
}
