import { Routes } from '@angular/router';

// Prosit 4: Modular Child Routes for Conferences feature
export const CONFERENCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../conferance-list/conferance-list').then((m) => m.ConferanceList),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../conferance-details/conferance-details').then((m) => m.ConferanceDetails),
  },
];
