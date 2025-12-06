
export class AppError extends Error {
    statusCode :number;
    isOperational: boolean;

    constructor(message:string, statusCode:number=500){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }

    
}
export const HandleError=(error:any)=>{
    if(error.name === 'ValidationError'){
            throw new AppError(error.message,400)
    }
    if(error.code === 11000){
            throw new AppError("Duplicate field error message",400)
    }
    if(error.name === 'CastError'){
            throw new AppError("Invalid Id Format",400)
    }
        return error;
}