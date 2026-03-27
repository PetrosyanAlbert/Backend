import { deepFreeze } from "../utils/index.js";

export const chatTypes = deepFreeze({
    DM: "dm",
    GROUP: "group",
});

export const chatTypesArray = Object.values(chatTypes);
