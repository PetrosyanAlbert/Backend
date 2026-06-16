import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import routes from "./routes.js";
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
