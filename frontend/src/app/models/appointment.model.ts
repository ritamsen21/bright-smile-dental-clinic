import { Doctor } from './doctor.model';
import { Patient } from './patient.model';

export interface Appointment {
  _id?: string;
  patient: Patient;
  doctor: Doctor;
  scheduledFor: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  visitFee: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookAppointmentRequest {
  patient: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  doctorId: string;
  scheduledFor: string;
  notes?: string;
}

export interface BookAppointmentResponse {
  appointmentId: string;
}
