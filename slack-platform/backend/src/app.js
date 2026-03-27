import express from "express";
import cookieParser from "cookie-parser";
import { notFoundMiddleware } from "./shared/middleware/notFound.middleware.js";
import { errorHandlerMiddleware } from "./shared/middleware/errorHandler.middleware.js";
import { authRouter } from "./modules/auth/auth.routes.js";
import { chatsRouter } from "./modules/chats/chats.routes.js";
import { messageRouter } from "./modules/messages/messages.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/messages", messageRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
