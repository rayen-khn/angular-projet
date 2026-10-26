import { Component, input, inject, OnInit, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ConferenceService } from '../services/conference.service';
import { Conferance } from '../services/conferance';
import { BookingService } from '../services/booking.service';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-conferance-details',
  imports: [RouterLink],
  templateUrl: './conferance-details.html',
  styleUrl: './conferance-details.css',
})
export class ConferanceDetails implements OnInit {
  id = input.required<string>();
  conference?: Conference;

  // Modern Dependency Injection via inject()
  private conferenceService = inject(ConferenceService);
  private conferanceService = inject(Conferance);
  private bookingService = inject(BookingService);
  private router = inject(Router);

  // Synchronized booking status
  readonly isBooked = computed<boolean>(() => {
    return this.bookingService.isBooked(Number(this.id()));
  });

  ngOnInit(): void {
    const numericId = Number(this.id());
    // Consommation de la méthode getById du service Conferance
    this.conference =
      this.conferanceService.getById(numericId) ||
      this.conferenceService.getById(numericId);
  }

  // Consommation de la méthode delete du service Conferance
  delete(id?: number): boolean {
    const targetId = id !== undefined ? id : Number(this.id());
    if (confirm('Voulez-vous vraiment supprimer cette conférence ?')) {
      const deleted = this.conferanceService.delete(targetId);
      if (deleted) {
        this.router.navigate(['/conferences']);
      }
      return deleted;
    }
    return false;
  }

  deleteConference(id?: number): boolean {
    return this.delete(id);
  }

  // Consommation de la méthode update du service Conferance
  update(conference: Conference): Conference | undefined {
    const updated = this.conferanceService.update(conference);
    if (updated) {
      this.conference = updated;
    }
    return updated;
  }

  updateConference(conference: Conference): Conference | undefined {
    return this.update(conference);
  }

  // Toggle booking directly from details
  toggleBooking(): void {
    if (this.conference) {
      this.bookingService.toggleBooking(this.conference);
    }
  }

  // Programmatic navigation after booking confirmation
  register(): void {
    if (this.conference) {
      this.bookingService.book(this.conference);
      this.router.navigate(['/confirmation'], {
        queryParams: {
          id: this.id(),
          name: this.conference.name,
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/conferences']);
  }
}
