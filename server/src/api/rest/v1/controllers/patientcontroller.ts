import { PatientService } from "@/services/patient-service";
import { ApiResponse } from "@/utils/response";
import { Request,Response,NextFunction } from "express";


export class PatientController {

private patientService :PatientService;

    constructor(){
        this.patientService = new PatientService();
    }

    getProfile= async (req:Request, res:Response,next:NextFunction)=>{
        try {
                const userId = req.user!.id;
                const profile = await this.patientService.getProfile(userId);
                return ApiResponse.success(res,profile);

        }catch(error){
            next(error)
        }
    }

    updateProfile = async (req:Request, res:Response,next:NextFunction)=>{
        try {
            const userId  = req.user!.id;
            const profile  = await this.patientService.updateProfile(userId,req.body);
            return ApiResponse.success(res,profile,"Profile updated Successfully ")
        }catch(error){
            next(error);
        }
    }

//    getMedicalHistory = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.user!.id;
//       const history = await this.patientService.getMedicalHistory(userId);
//       return ApiResponse.success(res, history);
//     } catch (error) {
//       next(error);
//     }
//   };
} 





