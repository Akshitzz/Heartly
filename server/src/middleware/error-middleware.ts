import { AppError, HandleError } from "@/utils/error-handler"
import { logger } from "@/utils/logger"
import { Response,Request,NextFunction } from "express"

export const errorMiddleware=(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
)=>{

    logger.error('Error',{
        message: error.message,
        stack:error.stack,
        path:req.path,
        method:req.method
    })


    const err= HandleError(error);

    if(err instanceof AppError){
        return res.status(500).json({
            success:false,
            message : err.message
        })
    }




    return res.status(500).json({
        success :false,
        message : process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message
    })
}   