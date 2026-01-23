const MAGIC_NUMBERS = require("./MAGIC_NUMBERS");

module.exports = function validaLogin(email, password) {
    if (!email || !isValidEmail(email)) throw new Error("Invalid email");
    if (!password || password.length < MAGIC_NUMBERS.MINIMUM_PASSWORD_LENGTH) {
        throw new Error("Password must be at least 6 characters");
    }
};

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
