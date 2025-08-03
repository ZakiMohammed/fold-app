import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { APP_CONSTANTS } from '../constants/core.constant';

export const ROUTE_DEFAULT = {
  firstChild: {
    snapshot: {
      title: 'Todo List',
      data: { icon: 'list' },
    } as Partial<ActivatedRouteSnapshot>,
  } as Partial<ActivatedRoute>,
} as Partial<ActivatedRoute>;

export const ROUTE_HOME = {
  snapshot: {
    title: APP_CONSTANTS.APP_NAME,
    data: { icon: 'list' },
  } as Partial<ActivatedRouteSnapshot>,
} as Partial<ActivatedRoute>;

export const ROUTE_RECURSIVE = {
  firstChild: {
    firstChild: {
      snapshot: {
        title: 'Todo List',
        data: { icon: 'list' },
      } as Partial<ActivatedRouteSnapshot>,
    } as Partial<ActivatedRoute>,
  } as Partial<ActivatedRoute>,
} as Partial<ActivatedRoute>;
