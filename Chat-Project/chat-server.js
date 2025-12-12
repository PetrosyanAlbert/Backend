require('dotenv').config();
const net = require('node:net');
const helpers = require('./utils/helpers');
const logger = require('./utils/logger');
const PORT = process.env.PORT;
const MAX_CLIENTS = process.env.MAX_CLIENTS;

//functions
const broadcast = (senderId, message) => {
    logger.log(`${senderId} -> ALL: ${message}`);
    for (let [id, clientSocket] of clients) {
        if (id !== senderId) {
            try {
                clientSocket.write(`-> ${message}\n`);
            } catch (err) {
                clients.delete(id);
            }
        }
    }
}

const handlePrivateMessage = (socket, message) => {
    const spaceIndex = message.indexOf(" ");
    if (spaceIndex === -1) {
        socket.write("-> Invalid private message format. Use: @User_XXXX message\n");
        return;
    }
    const targetId = message.substring(1, spaceIndex);
    const text = message.substring(spaceIndex + 1);
    const targetSocket = clients.get(targetId);
    if (!targetSocket) {
        socket.write(`-> User ${targetId} not found\n`);
        return;
    }
    logger.log(`${socket.id} -> ${targetId}: ${text}`);
    targetSocket.write(`-> \x1b[35m[Private] ${socket.id}: ${text}\x1b[0m\n`);
}

const handleCommand = (socket, message) => {
    const parts = message.split(" ");
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
        case "/list":
            handleList(socket);
            break;
        case "/rename":
            handleRename(socket, args[0]);
            break;
        default: 
        socket.write("-> Unknow command\n");
    }
}

function handleList(socket) {
    let list = "Online users:\n";
    for (let id of clients.keys()) {
        list += ` - \x1b[31m${id}\x1b[0m\n`;  
    }
    socket.write(list);
}

const handleRename = (socket, newName) => {
    if (!newName || newName.trim().length === 0) {
        socket.write("-> Usage: /rename NEW_NAME\n");
        return;
    }
    newName = newName.trim();
    const oldName = socket.id;
    if (!newName) {
        socket.write("-> Name cannot be empty\n");
        return;
    }
    if (newName === oldName) {
        socket.write("-> This is already your name\n");
        return;
    }
    if (clients.has(newName)) {
        socket.write("-> This name is already taken\n");
        return;
    }
    clients.delete(oldName);
    socket.id = newName;
    clients.set(newName, socket);
    logger.log(`${oldName} renamed to ${newName}`);
    socket.write(`-> Your name changed from \x1b[31m${oldName}\x1b[0m to \x1b[32m${newName}\x1b[0m\n`);
    broadcast(newName, `\x1b[36m${oldName} renamed to \x1b[32m${newName}\x1b[0m`);
}

//body
const clients = new Map();

const server = net.createServer((socket) => {
    if (clients.size >= MAX_CLIENTS) {
        socket.write("Server is full, try again later");
        socket.end();
        return;
    }
    const userId = helpers.generateUserId();
    socket.id = userId;
    clients.set(userId, socket);
    socket.write(`-> \x1b[32m\x1b[1mWelcome ${userId}!\x1b[0m\n`);
    broadcast(userId, `\x1b[36m${userId} joined the chat...\x1b[0m`);
    console.log(`\x1b[32m\x1b[1m-> ${userId} connected to chat\x1b[0m`);

    socket.on("data", (chunk) => {
        let message = chunk.toString().trim();
        if (!message) return;
        if (message.length > 500) {
            socket.write("-> Message is too long");
            return;
        }
        if (message.startsWith("@")) {
            handlePrivateMessage(socket, message);
            return;
        }
        if (message.startsWith("/")) {
            handleCommand(socket, message);
            return;
        }
        broadcast(socket.id, `\x1b[33m${socket.id}: ${message}\x1b[0m`);
    });

    socket.on("end", () => {
        logger.log(`${socket.id} disconnected`);
        clients.delete(socket.id);
        broadcast(socket.id, `\x1b[31m${socket.id} left the chat.\x1b[0m`);
    });

    socket.on("error", () => {
        logger.log(`${socket.id} disconnected unexpectedly`);
        clients.delete(socket.id);
        broadcast(socket.id, `\x1b[31m${socket.id} disconnected unexpectedly.\x1b[0m`);
    })
});

server.listen(PORT, () => {
    console.log(`TCP Chat Server is running on port ${PORT}`);
});
