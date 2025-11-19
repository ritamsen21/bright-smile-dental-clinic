import { connectToDatabase } from '../db/mongoose';
import { DoctorModel } from '../models/doctor.model';

const clear = async () => {
  await connectToDatabase();
  await DoctorModel.deleteMany({});
  console.log('✅ Cleared all doctors from database');
};

clear()
  .catch(console.error)
  .finally(() => process.exit(0));
