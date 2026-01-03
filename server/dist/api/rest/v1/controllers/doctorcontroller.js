import { ApiResponse } from "../../../../utils/response.js";
import { DoctorService } from "../../../../services/doctorservice.js";
export class DoctorController {
    constructor() {
        this.searchDoctors = async (req, res, next) => {
            try {
                const { speciality, location, rating, availability, insurance, page = 1, limit = 10, sortBy = 'rating' } = req.query;
                const doctors = await this.doctorService.SearchDoctors({
                    speciality: speciality,
                    location: location,
                    rating: rating ? parseFloat(rating) : undefined,
                    availability: availability,
                    insurance: insurance, page: parseInt(page),
                    limit: parseInt(limit),
                    sortBy: sortBy
                });
                return ApiResponse.success(res, doctors);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDoctorById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const doctor = await this.doctorService.getDoctorsById(id);
                return ApiResponse.success(res, doctor);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDoctorReviews = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { page = 1, limit = 10 } = req.query;
                const reviews = await this.doctorService.getDoctorReview(id, parseInt(page), parseInt(limit));
                return ApiResponse.success(res, reviews);
            }
            catch (error) {
                next(error);
            }
        };
        this.getDoctorAvailability = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { date } = req.query;
                const availability = await this.doctorService.getAvailabiltiy(id, date);
                return ApiResponse.success(res, availability);
            }
            catch (error) {
                next(error);
            }
        };
        this.getSpecialities = async (req, res, next) => {
            try {
                const specialties = await this.doctorService.getSpecialtites();
                return ApiResponse.success(res, specialties);
            }
            catch (error) {
                next(error);
            }
        };
        this.getMyProfile = async (req, res, next) => {
            try {
                const doctorId = req.user.id;
                const profile = await this.doctorService.getDoctorProfile(doctorId);
                return ApiResponse.success(res, profile);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const doctorId = req.user.id;
                const updatedoctorProfile = await this.doctorService.updatedoctorProfile(doctorId, req.body);
                return ApiResponse.success(res, updatedoctorProfile, "Profile updated Sunccessfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.setAvailability = async (req, res, next) => {
            try {
                const doctorId = req.user.id;
                const availability = await this.doctorService.getAvailabiltiy(doctorId, req.body);
                return ApiResponse.success(res, availability);
            }
            catch (error) {
                next(error);
            }
        };
        this.getMySchedule = async (req, res, next) => {
            try {
                const doctorId = req.user.id;
                const { startDate, endDate } = req.query;
                const schedule = await this.doctorService.getSchedule(doctorId, {
                    startDate: startDate,
                    endDate: endDate
                });
                return ApiResponse.success(res, schedule);
            }
            catch (error) {
                next(error);
            }
        };
        this.onboardDoctor = async (req, res, next) => {
            try {
                const doctor = await this.doctorService.onBoardDoctor(req.body);
                return ApiResponse.success(res, doctor, "Doctor onboarded successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyDoctor = async (req, res, next) => {
            try {
                const { id } = req.params;
                const doctor = await this.doctorService.VerifyDoctor(id);
                return ApiResponse.success(res, doctor, "Doctor vefired Successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.updateDoctorStatus = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const doctor = await this.doctorService.updateStatus(id, status);
                return ApiResponse.success(res, doctor, "Status updated successfully");
            }
            catch (error) {
                next(error);
            }
        };
        this.doctorService = new DoctorService();
    }
}
