import { created, ok } from "../../shared/utils/index.js";
import {
    createDmChat,
    createGroupChat,
    getChatMembers,
    getMyChats,
} from "./chats.service.js";

export const createDm = async (req, res) => {
    const result = await createDmChat(req.user.sub, req.body.targetUserId);

    if (result.isNew) {
        return created(res, "DM created successfully", {
            chat: result.chat,
        });
    }

    return ok(res, "DM chat already exists", { chat: result.chat });
};

export const createGroup = async (req, res) => {
    const chat = await createGroupChat(req.user.sub, req.body);

    return created(res, "Group chat created successfully", {
        chat,
    });
};

export const getChats = async (req, res) => {
    const chats = await getMyChats(req.user.sub);

    return created(res, "Chats fetched successfully", { chats });
};

export const getMembers = async (req, res) => {
    const members = await getChatMembers(req.user.sub, req.params.chatId);

    return ok(res, "Chat members fetched successfully", { members });
};
