import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  users = [
    { id: 1, name: 'Mohamed Rayen', email: 'rayen@esprit.tn', role: 'Organisateur', status: 'Actif' },
    { id: 2, name: 'Ons Ben Amor', email: 'ons.benamor@esprit.tn', role: 'Administrateur', status: 'Actif' },
    { id: 3, name: 'Ahmed Trabelsi', email: 'ahmed@esprit.tn', role: 'Participant', status: 'Inscrit' },
    { id: 4, name: 'Sami Mansour', email: 'sami@esprit.tn', role: 'Intervenant', status: 'Confirmé' },
  ];
}
