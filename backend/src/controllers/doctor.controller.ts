import { Request, Response } from 'express';
import { z } from 'zod';
import { DoctorModel } from '../models/doctor.model';

const updateDoctorSchema = z.object({
  visitFee: z.number().positive().optional(),
  workingHours: z
    .array(
      z.object({
        day: z.string(),
        start: z.string(),
        end: z.string(),
      })
    )
    .optional(),
});

export const getDoctorProfile = async (_req: Request, res: Response) => {
  const doctor = await DoctorModel.findOne();
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor profile not found' });
  }
  return res.json(doctor);
};

export const upsertDoctorProfile = async (req: Request, res: Response) => {
  const doctor = await DoctorModel.findOne();
  if (doctor) {
    doctor.set(req.body);
    await doctor.save();
    return res.json(doctor);
  }
  const created = await DoctorModel.create(req.body);
  return res.status(201).json(created);
};

export const updateDoctorScheduling = async (req: Request, res: Response) => {
  const payload = updateDoctorSchema.parse(req.body);
  const doctor = await DoctorModel.findOne();
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor profile not found' });
  }
  doctor.set(payload);
  await doctor.save();
  return res.json(doctor);
};
