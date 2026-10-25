import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-bookings',
  imports: [RouterLink],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  // Prosit Seance 3: Injected singleton BookingService
  private bookingService = inject(BookingService);

  readonly bookings = this.bookingService.bookings;
  readonly count = this.bookingService.bookingCount;

  cancel(conferenceId: number): void {
    this.bookingService.cancelBooking(conferenceId);
  }

  clearAll(): void {
    this.bookingService.clearBookings();
  }
}
