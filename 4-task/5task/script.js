const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

class Loger extends EventEmitter {
    log(eventType, msg) {
        this.emit(eventType, msg);
    }
}

const logger = new Loger();

const folder = "./loger";
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

logger.on("info", (msg) => {
    fs.appendFileSync(path.join(folder, "info.log"), msg);
    console.log("info");
});

logger.on("warn", (msg) => {
    fs.appendFileSync(path.join(folder, "warn.log"), msg);
    console.log("warn");
});

logger.on("error", (msg) => {
    fs.appendFileSync(path.join(folder, "error.log"), msg);
    console.log("error");
});

logger.log("info", "Application started successfully.");
logger.log("warn", "Low disk space warning.");
logger.log("error", "Failed to connect to database!");