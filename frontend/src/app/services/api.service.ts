import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';
import { Appointment, BookAppointmentRequest, BookAppointmentResponse } from '../models/appointment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Doctor endpoints
  getDoctorProfile(): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctors`);
  }

  // Patient endpoints
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patients`);
  }

  createPatient(patient: Partial<Patient>): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}/patients`, patient);
  }

  // Appointment endpoints
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments`);
  }

  bookAppointment(booking: BookAppointmentRequest): Observable<BookAppointmentResponse> {
    return this.http.post<BookAppointmentResponse>(`${this.apiUrl}/appointments`, booking);
  }

  // Doctor authentication
  loginDoctor(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { email, password });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('doctorToken');
  }
}
