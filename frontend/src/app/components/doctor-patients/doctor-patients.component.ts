import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-doctor-patients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-patients.component.html',
  styleUrl: './doctor-patients.component.scss'
})
export class DoctorPatientsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.apiService.isLoggedIn()) {
      this.router.navigate(['/doctor/login']);
      return;
    }
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getAppointments().subscribe({
      next: (appointments) => {
        this.appointments = appointments;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load patient appointments';
        this.loading = false;
        console.error(err);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('doctorToken');
    this.router.navigate(['/doctor/login']);
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTodayAppointments(): Appointment[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.appointments.filter(apt => {
      const aptDate = new Date(apt.scheduledFor);
      return aptDate >= today && aptDate < tomorrow && apt.status === 'scheduled';
    });
  }

  getUpcomingAppointments(): Appointment[] {
    const tomorrow = new Date();
    tomorrow.setHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.appointments.filter(apt => 
      new Date(apt.scheduledFor) >= tomorrow && apt.status === 'scheduled'
    );
  }

  getPastAppointments(): Appointment[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointments.filter(apt => 
      new Date(apt.scheduledFor) < today || apt.status !== 'scheduled'
    );
  }

  getTotalPatients(): number {
    const uniqueEmails = new Set(this.appointments.map(apt => apt.patient.email));
    return uniqueEmails.size;
  }
}
