import { PatientService } from "../../../../services/patient-service.js";
import { ApiResponse } from "../../../../utils/response.js";
export class PatientController {
    constructor() {
        this.getProfile = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const profile = await this.patientService.getProfile(userId);
                return ApiResponse.success(res, profile);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const profile = await this.patientService.updateProfile(userId, req.body);
                return ApiResponse.success(res, profile, "Profile updated Successfully ");
            }
            catch (error) {
                next(error);
            }
        };
        this.getMedicalHistory = async (req, res, next) => {
            try {
                const userId = req.user.id;
                const history = await this.patientService.getMedicalHistory(userId);
                return ApiResponse.success(res, history);
            }
            catch (error) {
                next(error);
            }
        };
        this.patientService = new PatientService();
    }
}
