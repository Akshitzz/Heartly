import User from "../models/user.model.js";
import { AppError } from "../utils/error-handler.js";


export class UserService {
    async getUserById(id:string){
        const user = await User.findById(id);
        if(!user){
            throw new AppError("User not found",404)
        }

        return user;
    }

    async UpdateUser(id:string,data:any){
        const user = await User.findByIdAndUpdate(
            id,
            {$set : data},
            {new:true,runValidators:true}
        );
        if(!user){
            throw new AppError("User not found ",404)
        }
        return user;
    }
    //  this returns pagiated users by total page in api itself 
    async getAllUsers(params :{
        page :number;
        limit :number;
        role?: string;
        status?:string;
    }){
        //  we are building query as come from request
        const query :any ={};
        if(params.role){
            query.role = params.role;
        }
        if(params.role){
            query.role = params.role;
        }
         const skip = (params.page -1) * params.limit;
          const [users,total] =  await Promise.all([User.find(query)
         .skip(skip)
         .limit(params.limit)
         .sort({createdAt :-1}),
         User.countDocuments(query)
          ])

          return {
            users,
            pagination:{
                page :params.page,
                limit  :params.limit,
                totalpages: Math.ceil(total/params.limit)
            }
          }
    }

async UpdateUserStatus (id:string,status:string){
        const user  = await User.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        );

        if(!user){
            throw  new AppError("User not found",404)
        }
        return user;
}


}