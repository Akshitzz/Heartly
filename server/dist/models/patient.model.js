import mongoose, { Schema } from 'mongoose';
const patientSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    allergies: [String],
    chronicConditions: [String],
    emergencyContact: {
        name: { type: String, required: true },
        relationship: String,
        phoneNumber: { type: String, required: true }
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    insurance: {
        provider: String,
        policyNumber: String,
        validUntil: Date
    },
    medicalHistory: [{
            type: Schema.Types.ObjectId,
            ref: 'MedicalHistory'
        }]
}, { timestamps: true });
export const Patient = mongoose.model('Patient', patientSchema);
