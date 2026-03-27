import { User } from "../modules/users/users.model.js";
import { Chat } from "../modules/chats/chats.model.js";
import { ChatMember } from "../modules/chat-members/chat-members.model.js";
import { Message } from "../modules/messages/messages.model.js";

export async function initDb() {
    await User.createCollection();
    await Chat.createCollection();
    await ChatMember.createCollection();
    await Message.createCollection();

    await User.syncIndexes();
    await Chat.syncIndexes();
    await ChatMember.syncIndexes();
    await Message.syncIndexes();

    console.log("Collections and indexes initialized");
}
