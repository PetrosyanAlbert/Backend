import { createClient } from "redis";
import { env } from "../../config/env.js";

export const redis = createClient({
    url: env.REDIS_URL,
});

redis.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

export async function connectRedis() {
    await redis.connect();
    console.log("Connected to Redis");
}
