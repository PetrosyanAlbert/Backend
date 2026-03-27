import { connectMongo, connectRedis } from "../db/index.js";
import { initDb } from "../db/initDb.js";

async function run() {
    await connectMongo();
    await connectRedis();
    await initDb();

    console.log("DB init completed");
    process.exit(0);
}

run().catch((error) => {
    console.error("DB init failed:", error);
    process.exit(1);
});
