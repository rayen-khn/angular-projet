import { Routes } from '@angular/router';

// Modular Child Routes for Conferences feature
export const CONFERENCE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../conferance-list/conferance-list').then((m) => m.ConferanceList),
  },
  {
    path: 'add',
    loadComponent: () =>
      import('../conference-form/conference-form.component').then(
        (m) => m.ConferenceFormComponent
      ),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('../conference-form/conference-form.component').then(
        (m) => m.ConferenceFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('../conferance-details/conferance-details').then(
        (m) => m.ConferanceDetails
      ),
  },
];
