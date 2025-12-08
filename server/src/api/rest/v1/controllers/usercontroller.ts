import { Request,Response,NextFunction } from "express";
import { UserService } from "@/services/user-service";
import { ApiResponse } from "@/utils/response";


export class UserController {
    private userService :UserService;

    constructor(){
        this.userService =  new UserService();
    }
    getProfile = async (req:Request,res:Response ,next:NextFunction)=>{
        try {
            const userId = req.user!.id;
            const user = await this.userService.getUserById(userId);
            return ApiResponse.success(res,user);
        }catch(error){
            next(error);
        }
    }

    updateProfile =async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const userId = req.user!.id;
            const user  = await this.userService.UpdateUser(userId,req.body);
            return ApiResponse.success(res,user,"Profiel Updated Successfully ")
        }catch(error){
            next(error)
        }
    }

    getAllUser=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {page=1,limit=10,role,status} = req.query;
            const users = await this.userService.getAllUsers({
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                role :role as string,
                status :status as string 
            });
            return ApiResponse.success(res,users);
        }catch(error){
            next(error);
        }
    }
    getUserById =async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id} = req.params;
            const {status} = req.body;
            const user = await this.userService.getUserById(id);
            return ApiResponse.success(res,user);
        }catch(error){
                next(error);
        }
    }
    updateUserStatus=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id} =req.params;
            const {status} = req.body;
            const user = await this.userService.UpdateUserStatus(id,status);
            return ApiResponse.success(res,user,"User updated Successfully");
        }catch(error){
            next(error);
        }
    }

}