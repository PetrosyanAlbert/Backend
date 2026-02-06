const express = require("express");
const customersRoutes = require("./routes/customers.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const accountsRoutes = require("./routes/accounts.routes");
const transfersRoutes = require("./routes/transfers.routes");

const app = express();

app.use(express.json());

app.use("/api/customers", customersRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/transfers", transfersRoutes);

app.use(errorMiddleware);

module.exports = app;
