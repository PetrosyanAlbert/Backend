import mongoose from "mongoose";
import { systemRolesArray, systemRoles } from "../../shared/constants/index.js";
import {
    userStatuses,
    userStatusesArray,
} from "../../shared/constants/index.js";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 100,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            match: [/\S+@\S+\.\S+/, "Invalid email format"],
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
        avatarURL: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 100,
            default: "",
        },
        role: {
            type: String,
            enum: systemRolesArray,
            default: systemRoles.USER,
        },
        status: {
            type: String,
            enum: userStatusesArray,
            default: userStatuses.ACTIVE,
        },
        lastSeenAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const User = model("User", userSchema);
