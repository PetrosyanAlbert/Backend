class User {
    constructor(name, role) {
        this.name = name;
        this.role = role;
    }
}

function validateUser(user) {
    if (!user.name || typeof user.name !== "string") {
        return false;
    }
    if (!roles.includes(user.role)) {
        return false;
    }
    return true;
}

const roles = ["student", "admin"];

module.exports = {User, validateUser, roles};
