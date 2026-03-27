import { deepFreeze } from "../utils/index.js";

export const userStatuses = deepFreeze({
    ACTIVE: "active",
    DELETED: "deleted",
});

export const userStatusesArray = Object.values(userStatuses);
