import { createClient } from "redis";
const URL = process.env.REDIS_URL;

export const redis = createClient({
    url: URL,
});

redis.on("error", (err) => {
    console.log("Redis error", err);
});

await redis.connect();
