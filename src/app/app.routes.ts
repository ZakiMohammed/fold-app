import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { getTitle } from './core/utils/core.util';
import { productRoutes } from './features/products/products.routes';
import { categoryRoutes } from './features/category/category.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/account/pages/login/login.component').then(
        (x) => x.LoginComponent,
      ),
    canActivate: [loginGuard],
    title: getTitle('Login'),
  },
  {
    path: '',
    component: ShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        title: getTitle(),
        loadComponent: () =>
          import('./features/global/pages/home/home.component').then(
            (x) => x.HomeComponent,
          ),
      },
      {
        path: 'about',
        title: getTitle('About'),
        data: { icon: 'heart-half' },
        loadComponent: () =>
          import('./features/global/pages/about/about.component').then(
            (x) => x.AboutComponent,
          ),
      },
      { path: 'products', loadChildren: () => productRoutes },
      { path: 'categories', loadChildren: () => categoryRoutes },
      {
        path: '**',
        title: getTitle('Not Found'),
        loadComponent: () =>
          import('./features/global/pages/not-found/not-found.component').then(
            (x) => x.NotFoundComponent,
          ),
      },
    ],
  },
];
