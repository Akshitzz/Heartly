import { IAvailability } from "@/types/types";
import mongoose, { Schema } from "mongoose";
const availabilitySchema = new Schema<IAvailability>(
    {
        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
            index: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        },
        timeSlots: [{
            time: String,
            isBooked: {
                type: Boolean,
                default: false
            },
            appointmentId: {
                type: Schema.Types.ObjectId,
                ref: 'Appointment'
            }
        }],
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

// Compound index
availabilitySchema.index({ doctorId: 1, date: 1 }, { unique: true });

export const Availability = mongoose.model<IAvailability>('Availability', availabilitySchema);