import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { sendMessageSchema } from "./messages.validation.js";
import { asyncHandler } from "../../shared/middleware/asyncHandler.js";
import { sendMessage } from "./messages.controller.js";

const messageRouter = Router();

messageRouter.post("/", authMiddleware, validate(sendMessageSchema), asyncHandler(sendMessage));

export { messageRouter };
