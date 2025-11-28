import { Schema ,model} from "mongoose";
import { UserI } from "../types/types";
const UserSchema = new Schema<UserI>(
    {
        name :{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            required:true
        },
        role:{
            enum:["admin","patient"],
            default:"patient"
        }
    },
    {timestamps:true}
)
export default model<UserI>("User",UserSchema);