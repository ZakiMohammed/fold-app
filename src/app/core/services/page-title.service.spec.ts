import { TestBed } from '@angular/core/testing';

import { PageTitleService } from './page-title.service';

describe('PageTitleService', () => {
  let service: PageTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('set', () => {
    it('should set page title', () => {
      const expected = { title: 'test' };
      service.set(expected);
      expect(service.pageTitle()).toEqual(expected);
    });

    it('should set null', () => {
      const expected = null;
      service.set(expected);
      expect(service.pageTitle()).toEqual(expected);
    });
  });
});
