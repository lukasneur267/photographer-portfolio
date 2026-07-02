import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingRequest, BookingService } from '../services/booking';

type RequestMode = 'contact' | 'booking';

const EMAIL_PATTERN = /^[^\s@]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

type BookingOption = {
  value: string;
  label: string;
  length: string;
  price: string;
  description: string;
};

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  constructor(
    public bookingService: BookingService,
    private route: ActivatedRoute,
  ) {
    this.updateBookingValidators();
  }

  requestMode: RequestMode = 'contact';
  minBookingDate = this.getTodayInputValue();
  successMessage = '';

  bookingOptions: BookingOption[] = [
    {
      value: 'wedding',
      label: 'Wedding day',
      length: 'Full day coverage',
      price: 'Est. Cost: EUR 2400',
      description: 'Ceremony, portraits, reception, and the small in-between moments.',
    },
    {
      value: 'portrait',
      label: 'Portrait session',
      length: '2 hour session',
      price: 'Est. Cost: EUR 450',
      description: 'Personal portraits, couples, editorial headshots, or family work.',
    },
    {
      value: 'editorial',
      label: 'Editorial story',
      length: 'Half day shoot',
      price: 'Est. Cost: EUR 900',
      description: 'Brand, travel, venue, or magazine-style visual storytelling.',
    },
    {
      value: 'event',
      label: 'Private event',
      length: 'Custom coverage',
      price: 'Est. Cost: EUR 750',
      description: 'Dinner parties, launches, intimate gatherings, and celebrations.',
    },
  ];

  requestForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(EMAIL_PATTERN)]),
    sessionType: new FormControl(''),
    bookingDate: new FormControl(''),
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.setRequestMode(params.get('mode') === 'booking' ? 'booking' : 'contact');
    });
  }

  get fullName() {
    return this.requestForm.controls.fullName;
  }

  get email() {
    return this.requestForm.controls.email;
  }

  get sessionType() {
    return this.requestForm.controls.sessionType;
  }

  get bookingDate() {
    return this.requestForm.controls.bookingDate;
  }

  get message() {
    return this.requestForm.controls.message;
  }

  get selectedBooking() {
    return this.bookingOptions.find((booking) => booking.value === this.sessionType.value);
  }

  get bookings() {
    return this.bookingService.getBookings();
  }

  setRequestMode(mode: RequestMode): void {
    this.requestMode = mode;
    this.successMessage = '';

    if (mode === 'contact') {
      this.requestForm.patchValue({ sessionType: '', bookingDate: '' });
    }

    this.updateBookingValidators();
  }

  submitRequest(): void {
    this.successMessage = '';

    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    if (this.requestMode === 'booking') {
      const request = this.requestForm.getRawValue();
      const selectedBooking = this.selectedBooking;
      const bookingRequest: BookingRequest = {
        fullName: request.fullName || '',
        email: request.email || '',
        sessionType: request.sessionType || '',
        sessionLabel: selectedBooking?.label || request.sessionType || '',
        bookingDate: request.bookingDate || '',
        message: request.message || '',
      };

      this.bookingService.add(bookingRequest);
      this.successMessage = 'Your booking request has been added.';
    } else {
      this.successMessage = 'Your message has been sent.';
    }

    this.requestForm.reset({
      fullName: '',
      email: '',
      sessionType: '',
      bookingDate: '',
      message: '',
    });
    this.updateBookingValidators();
  }

  private updateBookingValidators(): void {
    const bookingValidators = this.requestMode === 'booking' ? [Validators.required] : [];

    this.sessionType.setValidators(bookingValidators);
    this.bookingDate.setValidators(bookingValidators);
    this.sessionType.updateValueAndValidity({ emitEvent: false });
    this.bookingDate.updateValueAndValidity({ emitEvent: false });
  }

  private getTodayInputValue(): string {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  }
}