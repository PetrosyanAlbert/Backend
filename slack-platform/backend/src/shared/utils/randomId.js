import crypto from "crypto";

export const randomId = () => {
    return crypto.randomUUID();
};
