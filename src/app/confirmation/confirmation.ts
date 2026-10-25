import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  id = input<string>('');
  name = input<string>('');
  private router = inject(Router);

  backToConferences(): void {
    this.router.navigate(['/conferences']);
  }

  viewBookings(): void {
    this.router.navigate(['/bookings']);
  }
}
