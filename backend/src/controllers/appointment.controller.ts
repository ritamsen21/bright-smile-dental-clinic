import { Request, Response } from 'express';
import { z } from 'zod';
import { AppointmentModel } from '../models/appointment.model';
import { DoctorModel } from '../models/doctor.model';
import { PatientModel } from '../models/patient.model';
import { sendEmail, emailTemplates } from '../config/email';

const bookingSchema = z.object({
  patient: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    notes: z.string().optional(),
  }),
  doctorId: z.string().min(1),
  scheduledFor: z.string(),
  notes: z.string().optional(),
});

export const listAppointments = async (_req: Request, res: Response) => {
  const appointments = await AppointmentModel.find()
    .populate('patient')
    .populate('doctor')
    .sort({ scheduledFor: 1 });
  res.json(appointments);
};

export const bookAppointment = async (req: Request, res: Response) => {
  const payload = bookingSchema.parse(req.body);
  const doctor = await DoctorModel.findById(payload.doctorId);
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  const patient = await PatientModel.findOneAndUpdate(
    { email: payload.patient.email },
    { ...payload.patient, lastVisit: new Date(payload.scheduledFor), preferredDoctor: doctor._id },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const appointment = await AppointmentModel.create({
    patient: patient._id,
    doctor: doctor._id,
    scheduledFor: new Date(payload.scheduledFor),
    notes: payload.notes,
    visitFee: doctor.visitFee,
    status: 'scheduled',
  });

  // Format date and time for emails
  const appointmentDate = new Date(payload.scheduledFor);
  const formattedDate = appointmentDate.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = appointmentDate.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });

  // Send confirmation email to patient
  try {
    const patientEmailTemplate = emailTemplates.appointmentConfirmation(
      payload.patient.fullName,
      doctor.name,
      formattedDate,
      formattedTime
    );
    await sendEmail(payload.patient.email, patientEmailTemplate.subject, patientEmailTemplate.html);
    console.log('Patient confirmation email sent to:', payload.patient.email);
  } catch (error) {
    console.error('Failed to send patient email:', error);
  }

  // Send notification email to doctor
  try {
    const doctorEmailTemplate = emailTemplates.doctorNotification(
      payload.patient.fullName,
      payload.patient.email,
      payload.patient.phone,
      formattedDate,
      formattedTime,
      payload.notes || ''
    );
    await sendEmail(doctor.contact.email, doctorEmailTemplate.subject, doctorEmailTemplate.html);
    console.log('Doctor notification email sent to:', doctor.contact.email);
  } catch (error) {
    console.error('Failed to send doctor email:', error);
  }

  res.status(201).json({ appointmentId: appointment._id, message: 'Appointment booked successfully. Confirmation email sent!' });
};
