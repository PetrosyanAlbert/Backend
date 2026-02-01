require("dotenv").config({ quiet: true });

const express = require("express");
const app = express();

const moviesRoutes = require("./routes/movies.routes");
const usersRoutes = require("./routes/users.routes");
const reservationsRoutes = require("./routes/reservations.routes");
const reportsRoutes = require("./routes/reports.routes");

app.use(express.json());

app.use("/movies", moviesRoutes);
app.use("/users", usersRoutes);
app.use("/reservations", reservationsRoutes);
app.use("/reports", reportsRoutes);

module.exports = app;
