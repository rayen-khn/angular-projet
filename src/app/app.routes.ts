import { Routes } from '@angular/router';

export const routes: Routes = [
  // Prosit 4: loadComponent for single-page feature
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },

  // Prosit 4: loadChildren for multi-page feature with child routes
  {
    path: 'conferences',
    loadChildren: () =>
      import('./conferences/conferences.routes').then((m) => m.CONFERENCE_ROUTES),
  },

  // Backward-compatible routes for Prosit 2 & 3
  { path: 'list', redirectTo: 'conferences', pathMatch: 'full' },
  { path: 'details/:id', redirectTo: 'conferences/:id' },

  // Prosit 4: Administrative module with child routes, lazy-loaded on demand
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },

  // Prosit 3: Programmatic navigation destination after registration
  {
    path: 'confirmation',
    loadComponent: () =>
      import('./confirmation/confirmation').then((m) => m.Confirmation),
  },

  // Prosit 2: Default route redirection
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Prosit 2 & 4: Wildcard route for 404 handling
  {
    path: '**',
    loadComponent: () => import('./notfound/notfound').then((m) => m.Notfound),
  },
];
