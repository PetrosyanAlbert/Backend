const fs = require("fs");

const jsonData = fs.readFileSync("./user.json", "utf8");
const user = JSON.parse(jsonData);
console.log("Parsed object:", user);
console.log("Name:", user.name);
console.log("Age:", user.age);
console.log("Skills:", user.skills);


user.isStudent = true;
user.skills.push("TypeScript");
fs.writeFileSync("./user.json", JSON.stringify(user, null, 2));
const updated = JSON.stringify(user, null, 2);
console.log(user);

fs.writeFileSync("./updated.json", updated);
