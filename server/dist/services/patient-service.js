import { Patient } from "../models/patient.model.js";
import { AppError } from "../utils/error-handler.js";
import { MedicalHistory } from "../models/medicalhistory.model.js";
export class PatientService {
    async getProfile(userId) {
        const patient = await Patient.findOne({ userId }).populate('userId');
        if (!patient) {
            throw new AppError("Patient profile not found ", 404);
        }
        return patient;
    }
    async updateProfile(userId, data) {
        const patient = await Patient.findOneAndUpdate({ userId }, { $set: data }, { new: true, runValidators: true, upsert: true, setDefaultsOnInsert: true });
        return patient;
    }
    async getMedicalHistory(userId) {
        const patient = await Patient.findOne({ userId });
        if (!patient) {
            throw new AppError('Patient not found', 404);
        }
        const history = await MedicalHistory.find({ patientId: patient._id })
            .populate('doctorId', 'firstName lastName specialization')
            .sort({ date: -1 });
        return history;
    }
}
