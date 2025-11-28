import { model } from "mongoose";
import { Schema } from "mongoose";
const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        startsWith: "+91",
        unique: true
    }, specialization: {
        type: String,
        required: true
    },
    experience: { type: Number,
        required: true
    },
    availableDays: { type: [String],
        default: []
    },
});
export default model("Doctor", DoctorSchema);
