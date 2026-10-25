import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { Conference } from '../models/conference.model';

describe('BookingService', () => {
  let service: BookingService;

  const mockConf: Conference = {
    id: 99,
    name: 'Test Conference',
    date: '2026-12-01',
    place: 'Tunis',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingService);
    service.clearBookings();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with 0 bookings', () => {
    expect(service.bookingCount()).toBe(0);
  });

  it('should add a booking and update bookingCount signal', () => {
    const success = service.book(mockConf);
    expect(success).toBe(true);
    expect(service.bookingCount()).toBe(1);
    expect(service.isBooked(99)).toBe(true);
  });

  it('should toggle booking off and update count', () => {
    service.book(mockConf);
    expect(service.bookingCount()).toBe(1);

    const stillBooked = service.toggleBooking(mockConf);
    expect(stillBooked).toBe(false);
    expect(service.bookingCount()).toBe(0);
    expect(service.isBooked(99)).toBe(false);
  });
});
