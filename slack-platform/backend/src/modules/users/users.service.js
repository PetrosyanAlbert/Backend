import { User } from "./users.model.js";
import { ConflictError, NotFoundError } from "../../shared/errors/index.js";

export const getMe = async (userId) => {
    const user = User.findById(userId).lean();

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
};

export const updateMe = async (userId, data) => {
    if (data.username) {
        const isTaken = await User.exists({
            username: data.username,
            _id: { $ne: userId },
        }).lean();

        if (isTaken) {
            throw new ConflictError("Username already exists");
        }
    }

    const updatedUser = await User.findByIdAndDelete(
        userId,
        { $set: updateData },
        { new: true, runValidators: true },
    ).lean();

    if (!updatedUser) {
        throw new NotFoundError("User not found");
    }

    return updatedUser;
};

export const getUserById = async (targetUserId) => {
    const user = await User.findById(targetUserId)
        .select("-email -role -status")
        .lean();

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return user;
};

// TODO: endpoint for online users

