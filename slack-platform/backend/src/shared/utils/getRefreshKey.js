import { REFRESH_PREFIX } from "../constants/index.js";

export const getRefreshKey = (userId, jti) => {
    return `${REFRESH_PREFIX}:${userId}:${jti}`;
};
