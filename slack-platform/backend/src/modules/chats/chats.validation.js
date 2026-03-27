import Joi from "joi";

export const createDmChatSchema = Joi.object({
    targetUserId: Joi.string().trim().required(),
}).unknown(false);

export const createGroupChatSchema = Joi.object({
    title: Joi.string().trim().min(2).max(100).required(),
    description: Joi.string().trim().max(200).allow("").default(""),
    memberIds: Joi.array().items(Joi.string().trim().default([])),
}).unknown(false);
