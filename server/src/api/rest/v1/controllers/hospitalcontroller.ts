import { Request,Response,NextFunction } from "express";
import { HospitalService } from "../../../../services/hospitalservice.js";
import { ApiResponse } from "../../../../utils/response.js";


export class HospitalController {
    private hospitalService :HospitalService;
    constructor(){
        this.hospitalService = new HospitalService();
    }

    searchHospitals = async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {location ,specialty,rating ,page =1, limit=10}=req.query;
            const hospitals = await this.hospitalService.searchHospitals({
                 location :location as string,
            specialty :specialty as string,
            rating : rating? parseFloat(rating as string) :undefined,
            page :parseInt(page as string),
            limit :parseInt(limit as string)
            })
                return ApiResponse.success(res,hospitals);
        }catch(error){
            next(error)
        }
    }    


    getHospitalById = async (req:Request,res:Response,next:NextFunction)=>{
        try {
                const {id} = req.params;
                const hospital = await this.hospitalService.getHospitalById(id);
                return ApiResponse.success(res,hospital);
        }catch(error){
            next(error)
        }
    }

    getHospitalsDoctors= async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id } = req.params;
            const {specialty,page=1,limit =10} = req.query;
            const doctors = await this.hospitalService.getHospitalDoctors(
                id,
               { specialty:specialty as string,
                page :parseInt(page as string),
                limit :parseInt(limit as string)}
            )
            return ApiResponse.success(res,doctors);
        }catch(error){
            next(error);
        }
    }

    
 getHospitalDepartments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const departments = await this.hospitalService.getDepartments(id);
      return ApiResponse.success(res, departments);
    } catch (error) {
      next(error);
    }
  };

  createHospital = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hospital = await this.hospitalService.createHospital(req.body);
      return ApiResponse.created(res, hospital, 'Hospital created successfully');
    } catch (error) {
      next(error);
    }
  };

  updateHospital = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const hospital = await this.hospitalService.updateHospital(id, req.body);
      return ApiResponse.success(res, hospital, 'Hospital updated successfully');
    } catch (error) {
      next(error);
    }
  };

  deleteHospital = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.hospitalService.deleteHospital(id);
      return ApiResponse.success(res, null, 'Hospital deleted successfully');
    } catch (error) {
      next(error);
    }
  };

  addDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, doctorId } = req.params;
      const result = await this.hospitalService.addDoctor(id, doctorId);
      return ApiResponse.success(res, result, 'Doctor added to hospital');
    } catch (error) {
      next(error);
    }
  };

  removeDoctor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, doctorId } = req.params;
      await this.hospitalService.removeDoctor(id, doctorId);
      return ApiResponse.success(res, null, 'Doctor removed from hospital');
    } catch (error) {
      next(error);
    }
  };


}