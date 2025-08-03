import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { AppInsightsService } from './app-insights.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  const appInsightsServiceSpy = jasmine.createSpyObj<AppInsightsService>(['logException']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AppInsightsService, useValue: appInsightsServiceSpy }],
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error', () => {
    const customError = new Error('test');
    try {
      service.handleError(customError);
    } catch (error) {
      expect(error).toEqual(customError);
    }
    expect(appInsightsServiceSpy.logException).toHaveBeenCalled();
  });
});
