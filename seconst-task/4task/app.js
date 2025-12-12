console.log("First require:");
const a = require("./counter");

console.log("Delete from cache");
delete require.cache[require.resolve("./counter")];

console.log("Second require:");
const b = require("./counter");

console.log("Delete again");
delete require.cache[require.resolve("./counter")];

console.log("Third require:");
const c = require("./counter");
