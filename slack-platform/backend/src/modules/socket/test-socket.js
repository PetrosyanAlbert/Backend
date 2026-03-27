import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

socket.on("connect", () => {
    console.log("connected", socket.id);

    socket.emit("ping:check", { hello: "world" }, (response) => {
        console.log("server response: ", response);
    });
});

socket.on("disconnect", () => {
    console.log("disconnected");
});
