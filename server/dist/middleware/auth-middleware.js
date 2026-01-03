import { AppError } from "../utils/error-handler.js";
import { JWTUtil } from "../utils/jwt.js";
import User from '../models/user.model.js';
export const authMiddleWare = async (req, res, next) => {
    try {
        // getting auth token or jwt token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            throw new AppError("No token provided", 401);
        }
        // saving in variables and shortening length and also verfying
        const token = authHeader.substring(7);
        const decoded = JWTUtil.verifyAccessToken(token);
        // Ensure decoded has userId
        if (!decoded || !decoded.userId) {
            throw new AppError("Invalid token payload", 401);
        }
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new AppError('User not found', 401);
        }
        // Optional: Check if user is active
        // if (user.status !== 'active') {
        //     throw new AppError('User account is inactive', 403);
        // }
        req.user = {
            id: user._id.toString(),
            role: user.role
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
