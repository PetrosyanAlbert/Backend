require("dotenv").config({ quiet: true });
const app = require("./src/app");
const { sequelize } = require("./src/config/db");

const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("Something went wrong", err.message);
        process.exit(1);
    }
};

startServer();
