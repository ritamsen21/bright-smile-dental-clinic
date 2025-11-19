import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Appointment } from '../../models/appointment.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  loading = true;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
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
        this.error = 'Failed to load appointments';
        this.loading = false;
        console.error(err);
      }
    });
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

  getUpcomingAppointments(): Appointment[] {
    const now = new Date();
    return this.appointments.filter(apt => 
      new Date(apt.scheduledFor) >= now && apt.status === 'scheduled'
    );
  }

  getPastAppointments(): Appointment[] {
    const now = new Date();
    return this.appointments.filter(apt => 
      new Date(apt.scheduledFor) < now || apt.status !== 'scheduled'
    );
  }
}
