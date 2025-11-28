import { Schema, model } from "mongoose";
import { IAppointment } from "../types/types.js";

const AppointmentSchema = new Schema<IAppointment>(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default model<IAppointment>("Appointment", AppointmentSchema);
