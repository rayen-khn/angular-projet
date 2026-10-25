import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConferenceService } from '../services/conference.service';
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
  private bookingService = inject(BookingService);

  // Responsive signals for conference filtering and topic selection
  readonly conferences = this.conferenceService.filteredConferences;
  readonly topics = this.conferenceService.topics;
  readonly selectedTopic = this.conferenceService.selectedTopic;

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
