import fs from "fs";
const folder = "./logs";

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log("Folder created");
} else {
    console.log("Folder already exists");
}

const files = [
    { name: "info.log", text: "Info: everything is working fine." },
    { name: "warning.log", text: "Warning: something might be wrong." },
    { name: "error.log", text: "Error: something went wrong!" }
]

for (let file of files) {
    fs.writeFileSync(`${folder}/${file.name}`, file.text + "\n");
}
console.log("Files created");

const allFiles = fs.readdirSync(folder);
console.log("Files in folder -> ", allFiles);

for (const file of allFiles) {
    fs.unlinkSync(`${folder}/${file}`);
} 

fs.rmdirSync(folder);
