import { Schema, model, Types } from 'mongoose';

export interface Appointment {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  scheduledFor: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  visitFee: number;
  notes?: string;
}

const appointmentSchema = new Schema<Appointment>(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    scheduledFor: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    visitFee: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export const AppointmentModel = model<Appointment>('Appointment', appointmentSchema);
