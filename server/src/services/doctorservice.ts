import Doctor from "../models/doctor.model.js";
import { Availability } from "../models/availability.js";
import { CacheService } from "../cache/cache.service.js";
import { AppError } from "../utils/error-handler.js";
import { Review } from "../models/review.js";


export class DoctorService {

    private cacheService: CacheService;
    constructor() {
        this.cacheService = new CacheService();
    }

    async SearchDoctors(params: {
        speciality?: string,
        location?: string,
        rating?: number,
        availability?: string,
        insurance?: string,
        page: number,
        limit: number,
        sortBy: string
    }) {
        const query: any = { status: 'active', isVerified: true };
        if (params.speciality) {
            query.specialization = { $regex: params.speciality, $options: 'i' };
        }
        if (params.location) {
            query['address.city'] = { $regex: params.location, $options: 'i' }
        }
        if (params.rating) {
            query.averageRating = { $gte: params.rating };
        }
        const skip = (params.page - 1) * params.limit;
        let sortOptions: any = { averageRating: -1 };
        if (params.sortBy === 'experience') {
            sortOptions = { yearsOfExperience: -1 };

        } else if (params.sortBy === 'fee') {
            sortOptions = { consultationFee: -1 };
        }

        const [doctors, total] = await Promise.all([
            Doctor.find(query)
                .populate('hospitalId', 'name address')
                .sort(sortOptions)
                .skip(skip)
                .limit(params.limit)
                .select('-__v'),
            Doctor.countDocuments(query)
        ])
        return {
            doctors,
            pagination: {
                total,
                page: params.page,
                limit: params.limit,
                totalPages: Math.ceil(total / params.limit)
            }
        };
    }

    async getDoctorsById(id: string) {
        const cacheKey = `doctor:${id}`;
        // trying to get from cache
        const cacheDoctor = await this.cacheService.get(cacheKey);
        if (cacheDoctor) {
            return JSON.parse(cacheDoctor)
        }
        const doctor = await Doctor.findById(id)
            .populate('HosptialId')
            .select('-__v');

        if (!doctor) {
            throw new AppError("Doctor not found", 404)
        }
        // for 1 hr
        await this.cacheService.set(cacheKey, JSON.stringify(doctor), 3600)
        return doctor;
    }

    async getDoctorReview(doctorId: string, page: number, limit: number) {
        const skip = (page - 1) * limit;
        const [reviews, total] = await Promise.all([
            Review.find({ doctorId })
                .populate('patientId', 'firstName lastName')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Review.countDocuments({ doctorId })
        ])
        return {
            reviews,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        }
    }

    async getAvailabiltiy(doctorId: string, date: string) {
        const targetDate = date ? new Date(date) : new Date();
        const availability = await Availability.findOne({
            doctorId,
            date: {
                $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
                $lt: new Date(targetDate.setHours(23, 59, 59, 999))
            }
        });

        return availability || "No availability set for this date ";
    }

    async getSpecialtites() {
        const specialties = await Doctor.distinct('specialization');
        return specialties.sort();
    }

    async getDoctorProfile(doctorId: string) {
        const doctor = await Doctor.findById(doctorId).populate('HosptialId');
        if (!doctor) {
            throw new AppError("Doctor Not Found", 404)
        }
        return doctor

    }
    async updatedoctorProfile(doctorId: string, data: any) {
        const doctor = await Doctor.findByIdAndUpdate(doctorId,
            { $set: data },
            { new: true, runValidators: true }
        );
        if (!doctor) {
            throw new AppError("doctor not found ", 404)
        }
        // clear cache 
        await this.cacheService.delete(`doctor:${doctorId}`)
        return doctor;
    }

    async getSchedule(doctorId: string, params: { startDate?: string, endDate?: string }) {
        const query: any = { doctorId };
        if (params.endDate || params.startDate) {
            query.date = {};
            if (params.startDate) {
                query.date.$gte = new Date(params.startDate)
            }
            if (params.endDate) {
                query.date.$lte = new Date(params.endDate)
            }
        }

        const schedule = await Availability.find(query).sort({ date: 1 })
        return schedule;
    }

    async onBoardDoctor(data: any) {
        const doctor = await Doctor.create({
            ...data,
            status: 'pending',
            // todo change whne application scales
            isVerified: true
        })
        return doctor;
    }

    async VerifyDoctor(id: string) {
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { isVerified: true, status: "active" },
            { new: true }
        )
        if (!doctor) {
            throw new AppError('doctor not found ', 404)
        }

        return doctor
    }

    async updateStatus(id: string, status: string) {
        const doctor = await Doctor.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!doctor) {
            throw new AppError('Doctor not found', 404);
        }

        return doctor;
    }
}