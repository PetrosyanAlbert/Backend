import { deepFreeze } from "../utils/index.js";

export const systemRoles = deepFreeze({
    USER: "user",
    SUPERADMIN: "superadmin",
});

export const chatRoles = deepFreeze({
    OWNER: "owner",
    ADMIN: "admin",
    MEMBER: "member",
});

export const systemRolesArray = Object.values(systemRoles);
export const chatRolesArray = Object.values(chatRoles);
