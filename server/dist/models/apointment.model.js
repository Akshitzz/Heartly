import { Schema, model } from "mongoose";
const AppointmentSchema = new Schema({
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
}, { timestamps: true });
export default model("Appointment", AppointmentSchema);
