const components = require("./components");
const users = require("./users.swagger");
const products = require("./products.swagger");
const orders = require("./orders.swagger");

module.exports = {
    openapi: "3.0.0",
    info: {
        title: "E-Commerce API",
        version: "1.0.0",
        description: "Express + Sequelize E-Commerce API",
    },
    servers: [
        {
            url: "http://localhost:3001",
            description: "Local dev server",
        },
    ],
    tags: [
        { name: "Users", description: "User management" },
        { name: "Products", description: "Products management" },
    ],
    paths: {
        ...users,
        ...products,
        ...orders,
    },
    components,
};
