import Joi from 'joi';

export const hospitalValidator = {
    create: Joi.object({
        hospitalName: Joi.string().required().min(2).max(100),
        hospitalemail: Joi.string().email().required(),
        hospitalphone: Joi.string().required().pattern(/^\+?\d{10,15}$/).message('Phone number must be valid'),
        hospitaladdress: Joi.string().required(),
        hospitalcity: Joi.string().required(),
        hospitalstate: Joi.string().required(),
        hospitalpincode: Joi.string().required().pattern(/^\d{5,6}$/).message('Pincode must be valid'),
        hospitalimage: Joi.string().uri().allow(''),
        hospitalspecialties: Joi.array().items(Joi.string()),
        isVerified: Joi.boolean().default(false)
    }),

    update: Joi.object({
        hospitalName: Joi.string().min(2).max(100),
        hospitalemail: Joi.string().email(),
        hospitalphone: Joi.string().pattern(/^\+?\d{10,15}$/).message('Phone number must be valid'),
        hospitaladdress: Joi.string(),
        hospitalcity: Joi.string(),
        hospitalstate: Joi.string(),
        hospitalpincode: Joi.string().pattern(/^\d{5,6}$/).message('Pincode must be valid'),
        hospitalimage: Joi.string().uri().allow(''),
        hospitalspecialties: Joi.array().items(Joi.string()),
        isVerified: Joi.boolean()
    })
};
