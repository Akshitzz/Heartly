import mongoose, { Document } from "mongoose";

import { Types } from "mongoose";

export interface IPatient extends Document {
  userId: mongoose.Types.ObjectId;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    validUntil: Date;
  };
  medicalHistory: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "patient" | "admin" | "doctor";
  isEmailVerified?: boolean;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  passwordResetToken?: string;
  passwordResetExpiry?: Date;
  lastLogin?: Date;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface HospitalI extends Document {
  hospitalName: string,
  hospitalemail: string,
  hospitalphone: string,
  hospitaladdress: string,
  hospitalcity: string
  hospitalstate: string,
  hospitalpincode: string
  hospitalimage?: string
  hospitalspecialties: string[],
  isVerified: boolean
}

export interface DoctorI extends Document {
  name: string,
  email: string,
  phone: string,
  experience :Number,
  availableDays:String[]
  specialization: string,
  availabledays: string[],
  hospital: Types.ObjectId;
}
export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  hospital: Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}


export interface MedicalHistorySchemaI extends Document {
  patientId: mongoose.Types.ObjectId;
  appointmentId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  diagnosis: string;
  symptoms: string[];
  prescription: string;
  labResults?: string;
  notes?: string;
  attachments?: string[];
  createdAt: Date;
}

export interface IAvailability extends Document {
  doctorId: mongoose.Types.ObjectId;
  date: Date;
  timeSlots: {
    time: string;
    isBooked: boolean;
    appointmentId?: mongoose.Types.ObjectId;
  }[];
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReview extends Document {
  appointmentId: mongoose.Types.ObjectId;
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}