import mongoose from "mongoose";
import { chatTypes, chatTypesArray } from "../../shared/constants/index.js";

const { Schema, model } = mongoose;

const chatSchema = new Schema(
    {
        type: {
            type: String,
            enum: chatTypesArray,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            maxlength: 100,
            default: null,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 200,
            default: "",
        },
        avatarURL: {
            type: String,
            default: null,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        dmKey: {
            type: String,
            default: null,
        },
        lastMessageId: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        lastActivityAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

chatSchema.index({ lastActivityAt: -1 });

chatSchema.index(
    { dmKey: 1 },
    { unique: true, partialFilterExpression: { dmKey: { $type: "string" } } },
);

chatSchema.pre("validate", function () {
    if (this.type === chatTypes.GROUP && !this.title) {
        this.invalidate("title", "Group chat title is required");
    }
    if (this.type === chatTypes.DM && !this.dmKey) {
        this.invalidate("dmKey", "DM chat must have dmKey");
    }
});

export const Chat = model("Chat", chatSchema);
