import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../../shared/errors/index.js";
import { User } from "../users/users.model.js";
import { Chat } from "../chats/chats.model.js";
import { buildDmKey } from "../../shared/utils/index.js";
import { chatRoles, chatTypes } from "../../shared/constants/index.js";
import { ChatMember } from "../chat-members/chatMembers.model.js";

export const createDmChat = async (currentUserId, targetUserId) => {
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
        throw new BadRequestError("Invalid targetUserId");
    }

    if (String(currentUserId) === String(targetUserId)) {
        throw new BadRequestError("You cannot create a DM chat with yourself");
    }

    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
        throw new NotFoundError("Target user not found");
    }

    const dmKey = buildDmKey(currentUserId, targetUserId);

    const existingChat = await Chat.findOne({ type: chatTypes.DM, dmKey });

    if (existingChat) return { chat: existingChat, isNew: false };

    const chat = await Chat.create({
        type: chatTypes.DM,
        createdBy: currentUserId,
        dmKey,
    });

    await ChatMember.insertMany([
        {
            chatId: chat._id,
            userId: currentUserId,
            role: chatRoles.MEMBER,
        },
        {
            chatId: chat._id,
            userId: targetUserId,
            role: chatRoles.MEMBER,
        },
    ]);

    return {
        chat,
        isNew: true,
    };
};

export const createGroupChat = async (
    currentUserId,
    { title, description, memberIds = [] },
) => {
    const normalizedIds = [...new Set(memberIds.map(String))].filter(
        (memberId) => memberId !== String(currentUserId),
    );

    for (const memberId of normalizedIds) {
        if (!mongoose.Types.ObjectId.isValid(memberId)) {
            throw new BadRequestError(`Invalid memberId: ${memberId}`);
        }
    }

    if (normalizedIds.length > 0) {
        const usersCount = await User.countDocuments({
            _id: { $in: normalizedIds },
        });

        if (usersCount !== normalizedIds.length) {
            throw new NotFoundError("One or more users not found");
        }
    }

    const chat = await Chat.create({
        type: chatTypes.GROUP,
        title,
        description,
        createdBy: currentUserId,
    });

    const membersToInsert = [
        { chatId: chat._id, userId: currentUserId, role: chatRoles.OWNER },
        ...normalizedIds.map((memberId) => ({
            chatId: chat._id,
            userId: memberId,
            role: chatRoles.MEMBER,
        })),
    ];

    await ChatMember.insertMany(membersToInsert);

    return chat;
};

export const getMyChats = async (currentUserId) => {
    const memberships = await ChatMember.find({ userId: currentUserId })
        .select("chatId")
        .lean();

    const chatIds = memberships.map((memberships) => memberships.chatId);
    if (!chatIds.length) return [];

    const chats = await Chat.find({ _id: { $in: chatIds } })
        .sort({ lastActivityAt: -1 })
        .lean();

    return chats;
};

export const getChatMembers = async (currentUserId, chatId) => {
    if (!mongoose.Types.ObjectId.isValid(chatId)) {
        throw new BadRequestError("Invalid chatId");
    }

    const membership = await ChatMember.findOne({
        chatId,
        userId: currentUserId,
    }).lean();

    if (!membership) throw new NotFoundError("Chat not found");

    const members = await ChatMember.find({ chatId })
        .populate("userId", "fullName username email, avatarURL")
        .sort({ createdAt: 1 })
        .lean();
    
    return members.map(member => ({
        _id: member._id,
        chatId: member.chatId,
        role: member.role,
        user: member.userId
    }))
};
