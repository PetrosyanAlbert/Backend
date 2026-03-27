import Joi from "joi";

export const updateMeSchema = Joi.object({
    fullName: Joi.string().trim().min(2).max(100),
    username: Joi.string().trim().lowercase().min(2).max(100),
    bio: Joi.string().trim().max(100).allow(""),
    avatarURL: Joi.string().uri().allow(null, ""),
}).unknown(false);

export const searchUsersSchema = Joi.object({
    q: Joi.string().trim().min(2).max(50).required(),
    limit: Joi.number().integer().min(1).max(50).default(20),
    page: Joi.number().integer().min(1).default(1),
}).unknown(false);

export const userIdParamSchema = Joi.object({
    id: Joi.string().pattern(objectIdRegex).required(),
}).unknown(false);
