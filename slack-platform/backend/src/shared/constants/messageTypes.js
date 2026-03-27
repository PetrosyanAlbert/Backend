import { deepFreeze } from "../utils/index.js";

export const messageTypes = deepFreeze({
    TEXT: "text",
    IMAGE: "image",
    FILE: "file",
});

export const messageTypesArray = Object.values(messageTypes);
