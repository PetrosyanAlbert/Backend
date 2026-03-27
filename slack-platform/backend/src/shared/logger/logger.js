import winston from "winston";
import { env } from "../../config/env.js";

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return stack
        ? `${timestamp} [${level}]: ${message}\n${stack}`
        : `${timestamp} [${level}]: ${message}`;
});

export const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],
});

if (env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp(),
                errors({ stack: true }),
                consoleFormat,
            ),
        }),
    );
}
