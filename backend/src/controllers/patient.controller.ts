import { Request, Response } from 'express';
import { z } from 'zod';
import { PatientModel } from '../models/patient.model';

const patientSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  birthDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  preferredDoctor: z.string().optional(),
});

export const listPatients = async (_req: Request, res: Response) => {
  const patients = await PatientModel.find().sort({ createdAt: -1 });
  res.json(patients);
};

export const createPatient = async (req: Request, res: Response) => {
  const payload = patientSchema.parse(req.body);
  const patient = await PatientModel.create({ ...payload, birthDate: payload.birthDate ? new Date(payload.birthDate) : undefined });
  res.status(201).json(patient);
};
