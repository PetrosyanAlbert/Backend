import EventEmitter from "events";

class Timer extends EventEmitter {
    start() {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            this.emit("tick", count);
            if (count === 5) {
                this.emit("done");
                clearInterval(interval);
            }
        }, 1000);
    }
}

const emmiter = new Timer();

emmiter.on("tick", (count) => {
    console.log(`Tick ${count}`)
});

emmiter.on("done", () => {
    console.log("Timer finished");
})

emmiter.start();
