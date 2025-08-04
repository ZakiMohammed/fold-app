import { getTitle } from '../../core/utils/core.util';

export const categoryRoutes = [
  {
    path: '',
    title: getTitle('Category'),
    data: { icon: 'card-checklist' },
    loadComponent: () =>
      import('./pages/category-list/category-list.component').then(
        (x) => x.CategoryListComponent,
      ),
  },
  {
    path: ':id',
    title: getTitle('Category Details'),
    data: { icon: 'card-checklist' },
    loadComponent: () =>
      import('./pages/category-details/category-details.component').then(
        (x) => x.CategoryDetailsComponent,
      ),
  },
];
