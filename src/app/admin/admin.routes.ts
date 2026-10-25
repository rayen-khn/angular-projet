import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

// Prosit 4: Child routes within a lazy-loaded administrative module
export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./stats/stats.component').then((m) => m.StatsComponent),
      },
    ],
  },
];
