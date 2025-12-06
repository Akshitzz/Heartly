import { AppError } from "@/utils/error-handler";
import { Request,Response,NextFunction } from "express";

export const RoleMiddleWares = (allowedRoles:string[])=>{
        return (req: Request, res: Response, next: NextFunction)=>{
             if(!req.user){
                return next( new AppError("Unauthorized",401))
             }
             if(!allowedRoles.includes(req.user.role)){
                return next( new AppError('Forbidden :Insufficient permissions',403))
             }
             next();
        };
};