import fs from "fs";
const filePath = "./text.txt";

if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "Hello Backend\n");
    console.log("The file exists");
} else {
    fs.writeFileSync(filePath, "");
    console.log("The file created");
}

const content = fs.readFileSync(filePath, "utf-8");
console.log(content.toString());

fs.appendFileSync(filePath, "This is appended text.\n");

fs.unlink(filePath, (err) => {
    if (err) throw new Error("Error");
    console.log("File deleted");
});