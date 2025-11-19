import { Schema, model } from 'mongoose';

export interface Doctor {
  name: string;
  qualification: string;
  password: string;
  specializations: string[];
  bio: string;
  experienceYears: number;
  visitFee: number;
  workingHours: {
    day: string;
    start: string;
    end: string;
  }[];
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

const workingHourSchema = new Schema({
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const doctorSchema = new Schema<Doctor>(
  {
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    password: { type: String, required: true, select: false },
    specializations: [{ type: String, required: true }],
    bio: { type: String, required: true },
    experienceYears: { type: Number, required: true },
    visitFee: { type: Number, required: true },
    workingHours: { type: [workingHourSchema], default: [] },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const DoctorModel = model<Doctor>('Doctor', doctorSchema);
