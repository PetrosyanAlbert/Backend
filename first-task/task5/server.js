const config = require('./config');

console.log("PORT:", config.PORT);
console.log("DB URL:", config.DB_URL);
console.log("Production:", config.isProduction);
console.log(config.getEnvironmentInfo());