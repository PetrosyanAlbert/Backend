import Joi from "joi";

export const sendMessageSchema = Joi.object({
    chatId: Joi.string().hex().length(24).required(),
    text: Joi.string().trim().min(1).max(500).required(),
});
