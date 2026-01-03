import Joi from 'joi';
export const authValidator = {
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .message('Password must contain uppercase, lowercase, number and special character'),
        firstName: Joi.string().required().min(2).max(50),
        lastName: Joi.string().required().min(2).max(50),
        role: Joi.string().valid('patient', 'doctor', 'admin').required(),
        phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required()
    }),
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        deviceInfo: Joi.string().optional()
    }),
    refreshToken: Joi.object({
        refreshToken: Joi.string().required()
    }),
    forgotPassword: Joi.object({
        email: Joi.string().email().required()
    }),
    resetPassword: Joi.object({
        password: Joi.string().min(8).required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    }),
    resendVerification: Joi.object({
        email: Joi.string().email().required()
    }),
    changePassword: Joi.object({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().min(8).required()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    })
};
