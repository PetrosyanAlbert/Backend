require("dotenv").config({ quiet: true });
const http = require("node:http");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");
const productsRoutes = require("./routes/products.routes");
const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
    const start = Date.now();
    usersRoutes(req, res);
    ordersRoutes(req, res);
    productsRoutes(req, res);

    res.on('finish', () => {
        const time = Date.now() - start;
        console.log(`${req.method} ${req.url} - ${time}ms`);
    })
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
