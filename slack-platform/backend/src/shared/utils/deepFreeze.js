export const deepFreeze = (obj) => {
    if (!obj || typeof obj !== "object") return obj;

    Object.getOwnPropertyNames(obj).forEach((prop) => {
        const value = obj[prop];
        if (
            (value && typeof value === "object") ||
            (typeof value === "function" && !Object.isFrozen(value))
        ) {
            deepFreeze(value);
        }
    });
    
    return Object.freeze(obj);
};
