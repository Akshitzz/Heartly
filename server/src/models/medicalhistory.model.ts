import { MedicalHistorySchemaI } from "@/types/types";
import mongoose, { Schema } from "mongoose";


const MedicalHistorySchema= new Schema<MedicalHistorySchemaI>({
    patientId:{
        type :Schema.Types.ObjectId,
        ref:"Patient",
        required :true,
        index:true,
    },
    appointmentId:{
        type:mongoose.Types.ObjectId,
        ref:"Appointment",
        requred:true
    },
    doctorId:{
        type:mongoose.Types.ObjectId,
        ref:"Dcotor",
        required:true
    },
    date: {
      type: Date,
      required: true
    },
    diagnosis: {
      type: String,
      required: true
    },
    symptoms: [String],
    prescription: String,
    labResults: String,
    notes: String,
    attachments: [String]
  },
  { timestamps: true }    
)

export const MedicalHistory = mongoose.model<MedicalHistorySchemaI>('MedicalHistory',MedicalHistorySchema)