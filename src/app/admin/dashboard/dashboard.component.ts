import { Component, inject, computed } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  // Prosit Seance 3: Modern Dependency Injection
  private conferenceService = inject(ConferenceService);
  private bookingService = inject(BookingService);

  readonly totalConferences = computed(() => this.conferenceService.conferences().length);
  readonly userBookingsCount = this.bookingService.bookingCount;

  readonly metrics = computed(() => [
    {
      label: 'Conférences au catalogue',
      value: `${this.totalConferences()}`,
      icon: '🎤',
      color: '#3b82f6',
    },
    {
      label: 'Réservations session active',
      value: `${this.userBookingsCount()}`,
      icon: '🎟️',
      color: '#10b981',
    },
    {
      label: 'Intervenants confirmés',
      value: '12',
      icon: '💼',
      color: '#8b5cf6',
    },
    {
      label: 'Taux de satisfaction',
      value: '98%',
      icon: '⭐',
      color: '#f59e0b',
    },
  ]);
}
