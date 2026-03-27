import { created, ok } from "../../shared/utils/index.js";
import { createMessage, getChatMessages } from "./messages.service.js";

export const sendMessage = async (req, res) => {
    const message = await createMessage(req.user.sub, req.body);

    return created(res, "Message sent successfully", { message });
};

export const getMessages = async (req, res) => {
    const messages = await getChatMessages(req.user.sub, req.params.chatId);

    return ok(res, "Messages fetched successfully", { messages });
};
