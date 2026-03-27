import { Server } from "socket.io";
import { AppError, UnauthorizedError } from "../../shared/errors/index.js";
import { verifyAccessToken } from "../auth/auth.tokens.js";
import { ChatMember } from "../chat-members/chatMembers.model.js";

let io = null;

export const initSocket = (server) => {
    io = new Server(server, { cors: "*" });

    io.use((socket, next) => {
        try {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.headers?.authorization?.split(" ")[1] ||
                socket.handshake.query?.token;

            if (!token) {
                return next(
                    new UnauthorizedError("Unauthorized: No token provided"),
                );
            }

            const payload = verifyAccessToken(token);

            if (payload.type !== "access") {
                return next(
                    new UnauthorizedError("Unauthorized: Invalid token type"),
                );
            }
            socket.user = payload;
            next();
        } catch (err) {
            next(new UnauthorizedError("Unauthorized: Invalid token"));
        }
    });

    io.on("connection", async (socket) => {
        const userId = socket.user.sub;
        console.log(`Client connected: ${socket.id} | User: ${userId}`);

        try {
            socket.join(String(userId));

            const membership = await ChatMember.find({ userId })
                .select("chatId")
                .lean();

            const chatIds = membership.map((m) => String(m.chatId));

            chatIds.forEach((chatId) => {
                socket.join(chatId);
            });

            socket.userChatIds = chatIds;
            console.log(
                `User ${userId} joined ${chatIds.length} active chats.`,
            );

            socket.on("typing:start", ({ chatId }) => {
                socket.to(chatId).emit("user:typing", { userId, chatId });
            });

            socket.on("typing:stop", ({ chatId }) => {
                socket
                    .to(chatId)
                    .emit("user:stopped_typing", { userId, chatId });
            });
        } catch (err) {
            console.error("Error joining socket rooms:", err);
        }

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id} | User: ${userId}`);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new AppError("Socket.IO is not initialized");
    return io;
};
