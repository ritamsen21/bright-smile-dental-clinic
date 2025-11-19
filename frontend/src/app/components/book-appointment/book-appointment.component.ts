import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.scss'
})
export class BookAppointmentComponent implements OnInit {
  bookingForm: FormGroup;
  doctor: Doctor | null = null;
  loading = false;
  submitted = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.bookingForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      scheduledFor: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadDoctor();
    this.setMinDateTime();
  }

  setMinDateTime(): void {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minDateTime = now.toISOString().slice(0, 16);
    const dateInput = document.querySelector('input[type="datetime-local"]');
    if (dateInput) {
      dateInput.setAttribute('min', minDateTime);
    }
  }

  loadDoctor(): void {
    this.apiService.getDoctorProfile().subscribe({
      next: (doctor) => {
        this.doctor = doctor;
      },
      error: (err) => {
        this.error = 'Failed to load doctor information';
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.error = null;

    if (this.bookingForm.invalid || !this.doctor) {
      return;
    }

    this.loading = true;
    const formValue = this.bookingForm.value;

    const bookingData = {
      patient: {
        fullName: formValue.fullName,
        email: formValue.email,
        phone: formValue.phone,
        notes: formValue.notes || undefined
      },
      doctorId: this.doctor._id!,
      scheduledFor: new Date(formValue.scheduledFor).toISOString(),
      notes: formValue.notes || undefined
    };

    this.apiService.bookAppointment(bookingData).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/appointments']);
        }, 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to book appointment. Please try again.';
        console.error(err);
      }
    });
  }

  get f() {
    return this.bookingForm.controls;
  }
}
