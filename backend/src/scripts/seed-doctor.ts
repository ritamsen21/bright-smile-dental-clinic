import { connectToDatabase } from '../db/mongoose';
import { DoctorModel } from '../models/doctor.model';
import bcrypt from 'bcryptjs';

const seed = async () => {
  await connectToDatabase();
  const doctor = await DoctorModel.findOne();
  if (doctor) {
    console.log('Doctor already exists, skipping seed');
    return;
  }
  const hashedPassword = await bcrypt.hash('doctor123', 10);

  await DoctorModel.create({
    name: 'Dr. Arna Mal',
    qualification: 'BDS - Dental Housestaff',
    password: hashedPassword,
    specializations: [
      'Root Canal Treatment (RCT)',
      'Crown & Bridge',
      'Dental Filling',
      'Scaling & Polishing',
      'Teeth Whitening',
      'Oral Surgery',
      'Cosmetic Dentistry',
      'Preventive Care'
    ],
    bio: 'Dental Housestaff at College of Medicine and Sagar Dutta Hospital. Specialized in Root Canal Treatment, Crown & Bridge work, comprehensive dental fillings, professional scaling & polishing, and advanced teeth whitening procedures. Committed to delivering pain-free, exceptional oral healthcare with modern treatment techniques.',
    experienceYears: 3,
    visitFee: 200,
    workingHours: [
      { day: 'Mon', start: '09:00', end: '17:00' },
      { day: 'Tue', start: '09:00', end: '17:00' },
      { day: 'Wed', start: '09:00', end: '17:00' },
      { day: 'Thu', start: '09:00', end: '17:00' },
      { day: 'Fri', start: '09:00', end: '17:00' }
    ],
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@brightsmiledental.com',
      address: 'Katulpur'
    }
  });
  console.log('Seeded default doctor profile');
};

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
