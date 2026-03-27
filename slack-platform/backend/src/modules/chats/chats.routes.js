import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createDmChatSchema, createGroupChatSchema } from "./chats.validation.js";
import { asyncHandler } from "../../shared/middleware/asyncHandler.js";
import { createDm, createGroup, getChats, getMembers } from "./chats.controller.js";
import { getMessages } from "../messages/messages.controller.js";

const chatsRouter = Router();

chatsRouter.get("/:chatId/members", authMiddleware, asyncHandler(getMembers));

chatsRouter.get("/:chatId/messages", authMiddleware, asyncHandler(getMessages));

chatsRouter.get("/", authMiddleware, asyncHandler(getChats));

chatsRouter.post("/dm", authMiddleware, validate(createDmChatSchema), asyncHandler(createDm) );

chatsRouter.post("/group", authMiddleware, validate(createGroupChatSchema), asyncHandler(createGroup));

export { chatsRouter };
