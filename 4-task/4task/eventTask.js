import EventEmmiter from "events";

class MyEmmiter extends EventEmmiter {
    startTask() {
        console.log("starting task");
        this.emit("start");
    }
    finishTask() {
        console.log("finishing task");
        this.emit("finish");
    }
}

const emmiter = new MyEmmiter();

emmiter.on("start", () => {
    console.log("Event start");
});

emmiter.on("finish", () => {
    console.log("Event finish");
})

emmiter.startTask();
emmiter.finishTask();