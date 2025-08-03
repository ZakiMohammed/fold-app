import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from '../services/error-handler.service';

export const provideErrorHandler = () => ({ provide: ErrorHandler, useClass: ErrorHandlerService });
