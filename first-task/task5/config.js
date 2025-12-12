const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/mydatabase";
const isProduction = false;

function getEnvironmentInfo() {
    return {
        port: PORT,
        database: DB_URL,
        production: isProduction
    };
}

module.exports = {
    PORT,
    DB_URL,
    isProduction,
    getEnvironmentInfo
};
