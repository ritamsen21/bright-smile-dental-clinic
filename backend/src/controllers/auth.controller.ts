import { Request, Response } from 'express';
import { DoctorModel } from '../models/doctor.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export const doctorLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find doctor with password field
    const doctor = await DoctorModel.findOne({ 'contact.email': email }).select('+password');

    if (!doctor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: doctor._id, email: doctor.contact.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return doctor data without password
    const doctorData = doctor.toObject();
    delete (doctorData as any).password;

    res.json({
      token,
      doctor: doctorData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

export const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const doctor = await DoctorModel.findById(decoded.id);

    if (!doctor) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    res.json({ doctor });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
