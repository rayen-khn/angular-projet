import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent {
  stats = [
    { name: 'Angular Conference (Tunis)', registrations: 68, capacity: 80, progress: 85 },
    { name: 'Java Conference (Sousse)', registrations: 52, capacity: 60, progress: 86 },
    { name: 'AI Conference (Sfax)', registrations: 28, capacity: 100, progress: 28 },
  ];
}
