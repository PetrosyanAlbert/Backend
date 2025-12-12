const fs = require("fs");
const path = require("path");

const inputPath = process.argv[2];
if (!inputPath) {
    console.error("Please provide a JSON file path.");
    process.exit(1);
}

console.log("Directory name:", path.dirname(inputPath));
console.log("Base name:", path.basename(inputPath));
console.log("Ext:", path.extname(inputPath));

const parsed = path.parse(inputPath);
console.log("Parsed:", parsed);

if (!fs.existsSync(inputPath)) {
    console.error("File does not exist.");
    process.exit(1);
}

const jsonText = fs.readFileSync(inputPath, "utf8");
const jsonObj = JSON.parse(jsonText);

jsonObj.timestamp = new Date().toISOString();
console.log("Updated object:", jsonObj);

const outputFolder = "./output";
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

const outputFilePath = path.join(outputFolder, parsed.name + "_updated.json");

fs.writeFileSync(outputFilePath, JSON.stringify(jsonObj, null, 2));
console.log("Updated JSON saved to:", outputFilePath);


const updatedJsonText = JSON.stringify(jsonObj);
const buffer = Buffer.from(updatedJsonText, "utf8");

console.log("Buffer (HEX):", buffer.toString("hex"));

const restoredString = Buffer.from(buffer).toString("utf8");
console.log("Restored string:", restoredString);
