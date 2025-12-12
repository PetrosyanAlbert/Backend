const path = require("path");

console.log("Directory name", __dirname);
console.log("File name", path.basename(__filename));
console.log("Extension", path.extname(__filename));
const fullPath = path.join("src", "utils", "data.json");
console.log("Joined path", fullPath);
