import fs from "fs";

const origFile = "./original.txt";
fs.writeFileSync(origFile, "Hello, World\n");
console.log("File created");

const copy = "./copy.txt";
fs.copyFileSync(origFile, copy);
console.log("File copied");

const renamed = "./renamed.txt";
fs.renameSync(copy, renamed);
console.log("Copied fole renamed");

const allFiles = fs.readdirSync(".");
console.log("All files", allFiles);
