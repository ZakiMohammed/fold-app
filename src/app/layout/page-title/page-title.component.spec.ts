import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTitleComponent } from './page-title.component';
import { APP_CONSTANTS } from '../../constants/core.constant';

describe('PageTitleComponent', () => {
  let component: PageTitleComponent;
  let fixture: ComponentFixture<PageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCleanTitle', () => {
    it('should get clean title', () => {
      const expected = 'About';
      const title = `${expected} - ${APP_CONSTANTS.APP_NAME}`;

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });

    it('should get clean title without having split pattern', () => {
      const expected = 'About';
      const title = `${expected}`;

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });

    it('should get clean title without having multiple split pattern', () => {
      const expected = 'About';
      const title = `${expected} - ${APP_CONSTANTS.APP_NAME} - ${APP_CONSTANTS.APP_NAME}`;

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });

    it('should get clean title as empty if there is no title before split pattern', () => {
      const expected = '';
      const title = ` - ${APP_CONSTANTS.APP_NAME}`;

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });

    it('should get clean title as empty', () => {
      const expected = '';
      const title = '';

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });

    it('should get undefined', () => {
      const expected = undefined;
      const title = undefined;

      const result = component.getCleanTitle(title);

      expect(result).toEqual(expected);
    });
  });
});
