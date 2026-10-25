import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Modern DI via inject() as required by Prosit Seance 3
  private bookingService = inject(BookingService);

  // Reactive signal of booking count synchronized across the app
  readonly bookingCount = this.bookingService.bookingCount;
}
