import Joi from 'joi';
export const doctorValidator = {
    onboardDoctor: Joi.object({
        name: Joi.string().required().min(2).max(50),
        email: Joi.string().email().required(),
        phone: Joi.string().required().pattern(/^\+91\d{10}$/).message('Phone number must start with +91 and be followed by 10 digits'),
        specialization: Joi.string().required(),
        experience: Joi.number().required().min(0),
        availableDays: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
        consultationFee: Joi.number().min(0),
        hospitalId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/), // ObjectId validation
        address: Joi.object({
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zipCode: Joi.string(),
            country: Joi.string()
        })
    }),
    updateProfile: Joi.object({
        name: Joi.string().min(2).max(50),
        phone: Joi.string().pattern(/^\+91\d{10}$/).message('Phone number must start with +91 and be followed by 10 digits'),
        specialization: Joi.string(),
        experience: Joi.number().min(0),
        consultationFee: Joi.number().min(0),
        availableDays: Joi.array().items(Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
        address: Joi.object({
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zipCode: Joi.string(),
            country: Joi.string()
        })
    }),
    setAvailability: Joi.object({
        date: Joi.date().iso().required(),
        timeSlots: Joi.array().items(Joi.object({
            time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(), // HH:MM
            isBooked: Joi.boolean()
        })),
        isAvailable: Joi.boolean()
    }),
    updateStatus: Joi.object({
        status: Joi.string().valid('active', 'inactive', 'pending', 'suspended').required()
    })
};
