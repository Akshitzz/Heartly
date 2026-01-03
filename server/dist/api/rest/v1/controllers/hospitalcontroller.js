import { HospitalService } from "../../../../services/hospitalservice.js";
import { ApiResponse } from "../../../../utils/response.js";
export class HospitalController {
    constructor() {
        this.searchHospitals = async (req, res, next) => {
            try {
                const { location, specialty, rating, page = 1, limit = 10 } = req.query;
                const hospitals = await this.hospitalService.searchHospitals({
                    location: location,
                    specialty: specialty,
                    rating: rating ? parseFloat(rating) : undefined,
                    page: parseInt(page),
                    limit: parseInt(limit)
                });
                return ApiResponse.success(res, hospitals);
            }
            catch (error) {
                next(error);
            }
        };
        this.getHospitalById = async (req, res, next) => {
            try {
                const { id } = req.params;
                const hospital = await this.hospitalService.getHospitalById(id);
                return ApiResponse.success(res, hospital);
            }
            catch (error) {
                next(error);
            }
        };
        this.getHospitalsDoctors = async (req, res, next) => {
            try {
                const { id } = req.params;
                const { specialty, page = 1, limit = 10 } = req.query;
                const doctors = await this.hospitalService.getHospitalDoctors(id, { specialty: specialty,
                    page: parseInt(page),
                    limit: parseInt(limit) });
                return ApiResponse.success(res, doctors);
            }
            catch (error) {
                next(error);
            }
        };
        this.getHospitalDepartments = async (req, res, next) => {
            try {
                const { id } = req.params;
                const departments = await this.hospitalService.getDepartments(id);
                return ApiResponse.success(res, departments);
            }
            catch (error) {
                next(error);
            }
        };
        this.createHospital = async (req, res, next) => {
            try {
                const hospital = await this.hospitalService.createHospital(req.body);
                return ApiResponse.created(res, hospital, 'Hospital created successfully');
            }
            catch (error) {
                next(error);
            }
        };
        this.updateHospital = async (req, res, next) => {
            try {
                const { id } = req.params;
                const hospital = await this.hospitalService.updateHospital(id, req.body);
                return ApiResponse.success(res, hospital, 'Hospital updated successfully');
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteHospital = async (req, res, next) => {
            try {
                const { id } = req.params;
                await this.hospitalService.deleteHospital(id);
                return ApiResponse.success(res, null, 'Hospital deleted successfully');
            }
            catch (error) {
                next(error);
            }
        };
        this.addDoctor = async (req, res, next) => {
            try {
                const { id, doctorId } = req.params;
                const result = await this.hospitalService.addDoctor(id, doctorId);
                return ApiResponse.success(res, result, 'Doctor added to hospital');
            }
            catch (error) {
                next(error);
            }
        };
        this.removeDoctor = async (req, res, next) => {
            try {
                const { id, doctorId } = req.params;
                await this.hospitalService.removeDoctor(id, doctorId);
                return ApiResponse.success(res, null, 'Doctor removed from hospital');
            }
            catch (error) {
                next(error);
            }
        };
        this.hospitalService = new HospitalService();
    }
}
