module.exports = function validateUser(data, users = []) {
    const { fullName, email, password } = data;
    const errors = [];
    if (!fullName || fullName.length < 3) {
        errors.push("Full name must be at least 3 characters");
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        errors.push("Email is invalid");
    }
    if (!password || password.length < 6) {
        errors.push("Password must be at least 6 characters");
    }
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
        errors.push("Email already exists");
    }
    return errors;
};
