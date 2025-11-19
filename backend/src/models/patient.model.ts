import { Schema, model, Types } from 'mongoose';

export interface Patient {
  fullName: string;
  email: string;
  phone: string;
  birthDate?: Date;
  notes?: string;
  lastVisit?: Date;
  preferredDoctor?: Types.ObjectId;
}

const patientSchema = new Schema<Patient>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birthDate: { type: Date },
    notes: { type: String },
    lastVisit: { type: Date },
    preferredDoctor: { type: Schema.Types.ObjectId, ref: 'Doctor' },
  },
  { timestamps: true }
);

export const PatientModel = model<Patient>('Patient', patientSchema);
