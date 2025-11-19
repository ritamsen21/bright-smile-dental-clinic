export interface Patient {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  birthDate?: Date;
  notes?: string;
  lastVisit?: Date;
  preferredDoctor?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
