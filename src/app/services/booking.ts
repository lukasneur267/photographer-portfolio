import { Injectable } from '@angular/core';

export type BookingRequest = {
  fullName: string;
  email: string;
  sessionType: string;
  sessionLabel: string;
  bookingDate: string;
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: BookingRequest[] = [];

  add(booking: BookingRequest): void {
    this.bookings = [...this.bookings, booking];
  }

  remove(index: number): void {
    this.bookings = this.bookings.filter((_, bookingIndex) => bookingIndex !== index);
  }

  getBookings(): readonly BookingRequest[] {
    return this.bookings;
  }
}