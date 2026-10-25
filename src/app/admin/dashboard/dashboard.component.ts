import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  metrics = [
    { label: 'Conférences actives', value: '3', icon: '🎤', color: '#3b82f6' },
    { label: 'Inscriptions totales', value: '148', icon: '📝', color: '#10b981' },
    { label: 'Intervenants confirmés', value: '12', icon: '💼', color: '#8b5cf6' },
    { label: 'Taux de satisfaction', value: '98%', icon: '⭐', color: '#f59e0b' },
  ];
}
