module.exports = function validateUser(data) {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }
    if (typeof email !== "string" || !email.includes("@")) {
        throw new Error("Invalid email format");
    }
    if (typeof password !== "string" || password.length < MAGIC_NUMBERS.MINIMUM_PASSWORD_LENGTH) {
        throw new Error("Password must be at least 6 characters");
    }
};
