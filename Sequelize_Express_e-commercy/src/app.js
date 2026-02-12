const express = require("express");
const routes = require("./routes");
const errorMiddleware = require("./middlewares/error.middleware");
const swaggerUI = require("swagger-ui-express");
const openApiSpec = require("./swagger/index");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiSpec));

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
