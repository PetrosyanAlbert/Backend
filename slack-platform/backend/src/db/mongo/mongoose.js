import mongoose from "mongoose";
import { env } from "../../config/env.js";

export async function connectMongo() {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.log("MongoDB connection failed", err.message);
        process.exit(1);
    }
}
