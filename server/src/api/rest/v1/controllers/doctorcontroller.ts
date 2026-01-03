import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../../../../utils/response.js";
import { DoctorService } from "../../../../services/doctorservice.js";


export class DoctorController {
    private doctorService: DoctorService;
    constructor() {
        this.doctorService = new DoctorService();
    }

    searchDoctors = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                speciality,
                location,
                rating,
                availability,
                insurance,
                page = 1,
                limit = 10,
                sortBy = 'rating'
            } = req.query;
            const doctors = await this.doctorService.SearchDoctors({
                speciality: speciality as string,
                location: location as string,
                rating: rating ? parseFloat(rating as string) : undefined,
                availability: availability as string,
                insurance: insurance as string, page: parseInt(page as string),
                limit: parseInt(limit as string),
                sortBy: sortBy as string
            })
            return ApiResponse.success(res, doctors)
        } catch (error) {
            next(error)
        }
    }

    getDoctorById =async (req:Request,res:Response,next:NextFunction)=>{
       try{
         const { id} = req.params;
        const doctor = await this.doctorService.getDoctorsById(id);
        return ApiResponse.success(res,doctor);
       } catch(error){
        next(error)
       }
    }
    getDoctorReviews =async (req:Request,res:Response,next:NextFunction)=>{
        try{
            const  {id} = req.params;
            const {page =1 , limit =10} =req.query;
            const reviews = await this.doctorService.getDoctorReview(
                id,
                parseInt(page as string),
                parseInt(limit as string)
            ) ;
            return ApiResponse.success(res,reviews)
        }catch(error){
            next(error);
        }
    }
    getDoctorAvailability = async(req:Request,res:Response,next:NextFunction)=>{
            try{
                    const {id} = req.params;
                    const {date} = req.query;
                    const availability = await this.doctorService.getAvailabiltiy(
                        id,
                        date as string 
                    )
                    return ApiResponse.success(res,availability);
            }catch(error){
                next(error)
            }
    }
    getSpecialities = async(req:Request,res:Response,next:NextFunction)=>{
        try{    
            const specialties = await this.doctorService.getSpecialtites();
            return ApiResponse.success(res,specialties);
        }catch(error){
            next(error)
        }
    }
    getMyProfile =async(req:Request,res:Response,next:NextFunction)=>{
        try{
             const doctorId = req.user!.id;
             const profile  = await this.doctorService.getDoctorProfile(doctorId);
             return ApiResponse.success(res,profile);
        }catch(error){
            next(error)
        }
    }
    updateProfile = async(req:Request,res:Response,next:NextFunction)=>{
        try{
                const doctorId = req.user!.id;
                const updatedoctorProfile = await this.doctorService.updatedoctorProfile(doctorId,req.body);
                return ApiResponse.success(res,updatedoctorProfile,"Profile updated Sunccessfully");
        }catch(error){
            next(error)
        }
    }

    setAvailability =async(req:Request,res:Response,next:NextFunction)=>{
            try{
                const doctorId = req.user!.id;
                const availability = await this.doctorService.getAvailabiltiy(doctorId,req.body);
                return ApiResponse.success(res,availability);
            }catch(error){
                next(error)
            }
    }
    getMySchedule =async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const doctorId = req.user!.id;  
            const {startDate,endDate} = req.query;
            const schedule = await this.doctorService.getSchedule(doctorId,
                {
                    startDate: startDate as string ,
                    endDate :endDate as string 
                }
            )
            return ApiResponse.success(res,schedule);
        }catch(error){
            next(error)
        }
    }
    onboardDoctor = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const doctor = await this.doctorService.onBoardDoctor(req.body);
            return ApiResponse.success(res,doctor,"Doctor onboarded successfully");
        }catch(error){
            next(error);
        }
    }
    verifyDoctor =async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id} = req.params;
            const doctor = await this.doctorService.VerifyDoctor(id);
            return ApiResponse.success(res,doctor,"Doctor vefired Successfully");
        }catch(error){
                next(error)
        }
    }
    updateDoctorStatus = async(req:Request,res:Response,next:NextFunction)=>{
        try{
                const {id} = req.params;
                const {status} = req.body;
                const doctor = await this.doctorService.updateStatus(id,status);
                return ApiResponse.success(res,doctor,"Status updated successfully")
        }catch(error){
            next(error);
        }
    } 

}