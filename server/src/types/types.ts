import { Document } from "mongodb";
import { Types } from "mongoose";

export interface UserI extends Document {
 name: string;
  email: string;
  password: string;
  phone: string;
  role: "patient" | "admin";
}

export interface HospitalI extends Document 
    {
    hospitalName :string,       
    hospitalemail:string,
    hospitalphone :string,
    hospitaladdress:string,
    hospitalcity: string
    hospitalstate: string,
    hospitalpincode:string
    hospitalimage?: string
    hospitalspecialties: string[],
    isVerified:boolean
  }

export interface DoctorI extends Document {
    name :string,
    email :string,
    phone :string,
    specialization:string,
    availabledays:string[],
    hospital : Types.ObjectId;
}
export interface IAppointment extends Document {
  patient: Types.ObjectId;
  doctor: Types.ObjectId;
  hospital: Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}
