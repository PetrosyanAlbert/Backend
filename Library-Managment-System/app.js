require("dotenv").config({ quiet: true });
const express = require("express");
const session = require("express-session");

const attachUser = require("./src/middlewares/attachUser");
const authRoutes = require("./src/routes/auth.routes");
const booksRoutes = require("./src/routes/books.routes");
const adminRoutes = require("./src/routes/admin.routes");

const app = express();
const PORT = process.env.PORT;
const SECRET = process.env.SESSION_SECRET;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(attachUser);

app.get("/", (req, res) => {
    if (req.user) {
        return res.redirect("/books");
    }
    res.render("/pages/index");
});

app.use("/", authRoutes);
app.use("/", booksRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});