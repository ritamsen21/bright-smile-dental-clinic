export interface WorkingHour {
  day: string;
  start: string;
  end: string;
}

export interface DoctorContact {
  phone: string;
  email: string;
  address: string;
}

export interface Doctor {
  _id?: string;
  name: string;
  qualification: string;
  specializations: string[];
  bio: string;
  experienceYears: number;
  visitFee: number;
  workingHours: WorkingHour[];
  contact: DoctorContact;
  createdAt?: Date;
  updatedAt?: Date;
}
