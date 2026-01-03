import { AppError } from "../utils/error-handler.js";
import Hospital from '../models/hospital.model.js';
import Doctor from '../models/doctor.model.js';


export class HospitalService {
    async searchHospitals(params: {
        location?: string,
        specialty: string,
        rating?: number,
        page: number,
        limit: number
    }) {
        const query: any = { status: "active" };
        if (params.location) {
            query['address.city'] = { $regex: params.location, $options: 'i' }
        }
        if (params.rating) {
            query.averageRating = { $gte: params.rating }
        }
        const skip = (params.page - 1) & params.limit;

        const [hospitals, total] = await Promise.all([
            Hospital.find(query)
                .sort({ averageRating: -1 })
                .skip(skip)
                .limit(params.limit),
            Hospital.countDocuments(query)
        ]);

        return {
            hospitals,
            pagination: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        }

    }

    async getHospitalById(id: string) {
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            throw new AppError('Hospital not found', 404)
        }
        return hospital
    }

    async getHospitalDoctors(
        hospitalId: string,
        params: {
            specialty?: string, page: number; limit: number
        }
    ) {
        const query: any = { hospitalId, status: "active" };
        if (params.specialty) {
            query.specialization = { $regex: params.specialty, $options: 'i' }
        }
        const skip = (params.page - 1) * params.limit;

        const [doctors, total] = await Promise.all([
            Doctor.find(query)
                .sort({ averageRating: -1 })
                .skip(skip)
                .limit(params.limit),
            Doctor.countDocuments(query)
        ]);
        return { doctors, pagination: { total, page: params.page, limit: params.limit } }
    }

    async getDepartments(hospitalId: string) {
        const departments = await Doctor.find({ hospitalId }).distinct('specialization');
        return departments.sort();
    }

    async createHospital(data: any) {
        const hospital = await Hospital.create(data);
        return hospital;
    }

    async updateHospital(id: string, data: any) {
        const hospital = await Hospital.findByIdAndUpdate(id,
            { $set: data },
            { new: true, runValidators: true }
        )
        if (!hospital) {
            throw new AppError('Hospital not found', 404)
        }
    }
    async deleteHospital(id: string) {
        const hospital = await Hospital.findByIdAndDelete(id);
        if (!hospital) {
            throw new AppError('Hospital not found', 404)
        }
    }

    async addDoctor(hospitalId: string, doctorId: string) {
        const doctor = await Doctor.findByIdAndUpdate(
            doctorId,
            { hospitalId },
            { new: true }
        )
        if (!doctor) {
            throw new AppError("Doctor not found ", 404)
        }
        return doctor;
    }
    async removeDoctor(hospitalId: string, doctorId: string) {
        await Doctor.findByIdAndUpdate(doctorId, { $unset: { hospitalId: 1 } });
    }

}