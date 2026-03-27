import Joi from "joi";

export const registerSchema = Joi.object({
    fullName: Joi.string().trim().min(2).max(100).required(),
    username: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(8).max(100).required(),
}).unknown(false);

export const loginSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().min(8).max(128).required(),
}).unknown(false);