import dotenv from "dotenv";
import { assertEnv } from "../shared/utils/index.js";

dotenv.config({ quiet: true });

const HOST = assertEnv("HOST");
const PORT = Number(assertEnv("PORT"));

export const env = {
    HOST,
    PORT,

    BASE_URL: `http://${HOST}:${PORT}`,
    NODE_ENV: assertEnv("NODE_ENV"),
    MONGO_URI: assertEnv("MONGO_URI"),
    REDIS_URL: assertEnv("REDIS_URL"),

    JWT_ACCESS_SECRET: assertEnv("JWT_ACCESS_SECRET"),
    JWT_REFRESH_SECRET: assertEnv("JWT_REFRESH_SECRET"),
    JWT_ACCESS_EXPIRES_IN: assertEnv("JWT_ACCESS_EXPIRES_IN"),
    JWT_REFRESH_EXPIRES_IN: assertEnv("JWT_REFRESH_EXPIRES_IN"),

    REFRESH_TOKEN_TTL_SECONDS: Number(assertEnv("REFRESH_TOKEN_TTL_SECONDS")),
};
