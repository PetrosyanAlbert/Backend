import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../shared/errors/index.js";
import { Chat } from "../chats/chats.model.js";
import { ChatMember } from "../chat-members/chatMembers.model.js";
import { Message } from "./messages.model.js";
import { getIO } from "../socket/index.js";

export const createMessage = async (currentUserId, { chatId, text }) => {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new BadRequestError("Invalid chatId");
    }

    const normalizedText = text.trim();

    if (!normalizedText) {
        throw new BadRequestError("Message text is required");
    }

    const membership = await ChatMember.findOne({
        chatId,
        userId: currentUserId,
    }).lean();

    if (!membership) {
        throw new NotFoundError("Chat not found");
    }

    const message = await Message.create({
        chatId,
        senderId: currentUserId,
        text: normalizedText,
    });

    await Chat.findByIdAndUpdate(chatId, {
        lastMessageId: message._id,
        lastActivityAt: new Date(),
    });

    try {
        const io = getIO();
        const populatedMessage = await message.populate(
            "senderId",
            "fullName username email avatarURL",
        );
        const messagePayload = {
            _id: populatedMessage._id,
            chatId: populatedMessage.chatId,
            text: populatedMessage.text,
            editedAt: populatedMessage.editedAt,
            isDeleted: populatedMessage.isDeleted,
            createdAt: populatedMessage.createdAt,
            updatedAt: populatedMessage.updatedAt,
            sender: populatedMessage.senderId,
        };

        io.to(String(chatId)).emit("message:new", messagePayload);
    } catch (err) {
        console.log("Failed to broadcast message: ", err);
    }

    return message;
};

export const getChatMessages = async (currentUserId, chatId) => {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new BadRequestError("Invalid ChatId");
    }

    const membership = await ChatMember.findOne({
        chatId,
        userId: currentUserId,
    }).lean();

    if (!membership) {
        throw new NotFoundError("Chat not found");
    }

    const messages = await Message.find({ chatId, isDeleted: false })
        .populate("senderId", "fullName username email avatarURL")
        .sort({ createdAt: 1 })
        .lean();

    return messages.map((message) => ({
        _id: message.isDeleted,
        chatId: message.chatId,
        text: message.text,
        editedAt: message.editedAt,
        isDeleted: message.isDeleted,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
        sender: message.senderId,
    }));
};
