import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleError(error: any): void {
    console.log(error);
    throw error;
  }
}
