import  { model } from "mongoose";
import { Schema } from "mongoose";
import { HospitalI } from "../types/types";

const HospitalSchema = new Schema<HospitalI>(
    {
        hospitalName :{
            type :String,
            required :true
        },
        hospitalemail:{
            type:String,
            required:true
        },
        hospitalphone: {
      type: String,
      required: true
        },
    hospitaladdress: {
      type: String,
      required: true
    },
    hospitalcity: {
      type: String,
      required: true
    },
    hospitalstate: {
      type: String,
      required: true
    },
    hospitalpincode: {
      type: String,
      required: true
    },
    hospitalimage: {
      type: String,
      default: ""
    },
    hospitalspecialties: {
      type: [String],
      default: []
    },
    isVerified: {
      type: Boolean,
      default: false
    }
    },
    {timestamps:true}
)

export default model<HospitalI>("Hospital",HospitalSchema);