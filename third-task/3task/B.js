const buf = Buffer.from("Hello World", "utf8");
console.log("Original buffer:", buf);

console.log("UTF-8:", buf.toString("utf8"));

const hex = buf.toString("hex");
console.log("HEX:", hex);

const base64 = buf.toString("base64");
console.log("Base64:", base64);

const bufFromHex = Buffer.from(hex, "hex");
console.log("Buffer from HEX:", bufFromHex);
console.log("Decoded from HEX:", bufFromHex.toString("utf8"));
