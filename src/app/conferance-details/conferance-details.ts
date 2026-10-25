import { Component, input, inject, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ConferenceService } from '../services/conference.service';
import { BookingService } from '../services/booking.service';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-conferance-details',
  imports: [],
  templateUrl: './conferance-details.html',
  styleUrl: './conferance-details.css',
})
export class ConferanceDetails implements OnInit {
  id = input.required<string>();
  conference?: Conference;

  // Modern Dependency Injection via inject()
  private conferenceService = inject(ConferenceService);
  private bookingService = inject(BookingService);
  private router = inject(Router);

  // Synchronized booking status
  readonly isBooked = computed<boolean>(() => {
    return this.bookingService.isBooked(Number(this.id()));
  });

  ngOnInit(): void {
    const numericId = Number(this.id());
    this.conference = this.conferenceService.getById(numericId);
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
