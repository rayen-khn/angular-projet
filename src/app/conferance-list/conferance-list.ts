import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../services/conference.service';
import { Conferance } from '../services/conferance';
import { BookingService } from '../services/booking.service';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList {
  // Prosit Seance 3: Modern Dependency Injection via inject()
  private conferenceService = inject(ConferenceService);
  private conferanceService = inject(Conferance);
  private bookingService = inject(BookingService);

  // Responsive signals for conference filtering and topic selection
  readonly conferences = this.conferenceService.filteredConferences;
  readonly topics = this.conferenceService.topics;
  readonly selectedTopic = this.conferenceService.selectedTopic;

  // Consommation du service Conferance: récupération de toutes les conférences
  getAll(): Conference[] {
    return this.conferanceService.getAll();
  }

  // Consommation du service Conferance: récupération par ID
  getById(id: number): Conference | undefined {
    return this.conferanceService.getById(id);
  }

  // Consommation du service Conferance: suppression d'une conférence
  delete(id: number): boolean {
    return this.conferanceService.delete(id);
  }

  deleteConference(id: number): boolean {
    return this.conferanceService.deleteConference(id);
  }

  // Consommation du service Conferance: mise à jour d'une conférence
  update(conference: Conference): Conference | undefined {
    return this.conferanceService.update(conference);
  }

  updateConference(conference: Conference): Conference | undefined {
    return this.conferanceService.updateConference(conference);
  }

  // Filter conferences by subject/topic
  onSelectTopic(topic: string): void {
    this.conferenceService.setTopicFilter(topic);
  }

  // Real-time reservation status check
  isBooked(conferenceId: number): boolean {
    return this.bookingService.isBooked(conferenceId);
  }

  // Toggle booking directly from the catalog
  toggleBooking(conference: Conference): void {
    this.bookingService.toggleBooking(conference);
  }
}
