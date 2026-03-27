export const assertEnv = (name) => {
    const value = process.env[name];
    if (value === undefined || value === null || value === "") {
        throw new Error(`Environment variable ${name} is required`);
    }
    return value;
};
