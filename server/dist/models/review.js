import { Schema } from "mongoose";
import mongoose from "mongoose";
const reviewSchema = new Schema({
    appointmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Appointment',
        required: true,
        unique: true
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        index: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: String,
    isVerified: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });
export const Review = mongoose.model('Review', reviewSchema);
