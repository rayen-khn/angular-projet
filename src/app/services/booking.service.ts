import { Injectable, signal, computed } from '@angular/core';
import { Conference } from '../models/conference.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  // Shared reactive state of booked conferences across the application
  private bookedListSignal = signal<Conference[]>([]);

  // Readonly list of user bookings
  bookings = this.bookedListSignal.asReadonly();

  // Computed signal for total number of bookings (consumed by NavbarComponent)
  bookingCount = computed<number>(() => this.bookedListSignal().length);

  // Check if a conference is already booked
  isBooked(conferenceId: number): boolean {
    return this.bookedListSignal().some((c) => c.id === conferenceId);
  }

  // Book a conference place
  book(conference: Conference): boolean {
    if (this.isBooked(conference.id)) {
      return false;
    }
    this.bookedListSignal.update((current) => [...current, conference]);
    return true;
  }

  // Cancel a booking
  cancelBooking(conferenceId: number): void {
    this.bookedListSignal.update((current) =>
      current.filter((c) => c.id !== conferenceId)
    );
  }

  // Toggle booking status
  toggleBooking(conference: Conference): boolean {
    if (this.isBooked(conference.id)) {
      this.cancelBooking(conference.id);
      return false;
    } else {
      return this.book(conference);
    }
  }

  // Clear all bookings
  clearBookings(): void {
    this.bookedListSignal.set([]);
  }
}
