import mongoose from "mongoose";
import { chatRoles, chatRolesArray } from "../../shared/constants/index.js";

const { Schema, model } = mongoose;

const chatMemberSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role: {
            type: String,
            enum: chatRolesArray,
            default: chatRoles.MEMBER,
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
        leftAt: {
            type: Date,
            default: null,
        },
        lastReadMessageId: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        lastReadAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

chatMemberSchema.index({ chatId: 1, userId: 1 }, { unique: true });
chatMemberSchema.index({ chatId: 1 });
chatMemberSchema.index({ userId: 1 });

export const ChatMember = model("ChatMember", chatMemberSchema);
