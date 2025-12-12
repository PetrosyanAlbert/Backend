const {User, validateUser, roles} = require('./userService');

const user = new User('Albert', 'student');

if (validateUser(user)) {
    console.log("It's okey");
} else {
    console.log("It's not okey");
}

console.log(roles);

