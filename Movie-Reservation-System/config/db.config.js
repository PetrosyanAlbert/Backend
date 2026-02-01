require("dotenv").config({ quiet: true });

const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: "",
    database: process.env.DB_NAME,
};
module.exports = dbConfig;
