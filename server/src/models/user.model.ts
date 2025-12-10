import { Schema, model } from "mongoose";
import { UserI } from "../types/types.js";
const UserSchema = new Schema<UserI>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "patient", "doctor"],
            default: "patient"
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: String,
        emailVerificationExpiry: Date,
        passwordResetToken: String,
        passwordResetExpiry: Date,
        lastLogin: Date,
        status: {
            type: String,
            enum: ['active', 'inactive', 'suspended'],
            default: 'active'
        }
    },
    { timestamps: true }
)
export default model<UserI>("User", UserSchema);