import { getTitle } from '../../core/utils/core.util';

export const productRoutes = [
  {
    path: '',
    title: getTitle('Products'),
    data: { icon: 'rocket-takeoff-fill' },
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (x) => x.ProductListComponent,
      ),
  },
  {
    path: ':id',
    title: getTitle('Product Details'),
    data: { icon: 'rocket-takeoff-fill' },
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(
        (x) => x.ProductDetailsComponent,
      ),
  },
];
