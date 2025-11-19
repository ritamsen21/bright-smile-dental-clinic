import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';

import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorPatientsComponent } from './components/doctor-patients/doctor-patients.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'doctor/login', component: DoctorLoginComponent },
  { path: 'doctor/patients', component: DoctorPatientsComponent },
  { path: '**', redirectTo: '' }
];
