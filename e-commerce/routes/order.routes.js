const express = require("express");
const path = require("path");
const auth = require("../middleware/auth.middleware");
const authRole = require("../middleware/role.middleware");
const { randomUUID } = require("crypto");
const { readFile, writeFileAtomic } = require("../utils/jsonStore");
const validateOrders = require("../utils/validateOrders");
const HTTP = require("../utils/httpStatus");

const router = express.Router();
const ORDERS_PATH = path.join(__dirname, "../data/orders.json");
const PRODUCTS_PATH = path.join(__dirname, "../data/products.json");

router.get("/", auth, async (req, res) => {
    try {
        const orders = await readFile(ORDERS_PATH);
        if (req.user.role === "customer") {
            const ownOrders = orders.filter((o) => o.userId === req.user.id);
            return res.json(ownOrders);
        }
        if (req.user.role === "admin") {
            return res.json(orders);
        }
        return res.status(HTTP.FORBIDDEN).json({ message: "Forbidden" });
    } catch (err) {
        return res.json(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const orders = await readFile(ORDERS_PATH);
        const ownOrders = orders.find((o) => o.id === req.params.id);
        if (!ownOrders) {
            return res.status(HTTP.NOT_FOUND).json({ message: "Order not found" });
        }
        if (req.user.role === "customer" && order.userId !== req.user.id) {
            return res.status(HTTP.FORBIDDEN).json({ message: "Forbidden" });
        }
        return res.json(ownOrders);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

router.post("/", auth, authRole("customer"), async (req, res) => {
    try {
        validateOrders(req.body);
        const userId = req.user.id;
        const { items } = req.body;
        const orders = await readFile(ORDERS_PATH);
        const products = await readFile(PRODUCTS_PATH);
        let totalAmount = MAGIC_NUMBERS.ZERO;
        const orderItems = [];
        for (let item of items) {
            const { productId, quantity } = item;
            const product = products.find((p) => p.id === productId);
            if (!product) {
                return res
                    .status(HTTP.NOT_FOUND)
                    .json({ message: `Product not found: ${productId}` });
            }
            if (product.stock < quantity) {
                return res.status(HTTP.BAD_REQUEST).json({
                    message: `Not enough stock for product: ${product.name}`,
                });
            }
            const priceAtPurchase = product.price;
            totalAmount += priceAtPurchase * quantity;
            product.stock -= quantity;
            orderItems.push({ productId, quantity, priceAtPurchase });
        }
        const order = {
            id: randomUUID(),
            userId,
            items: orderItems,
            totalAmount,
            status: "created",
            createdAt: new Date().toISOString(),
        };
        orders.push(order);
        await writeFileAtomic(PRODUCTS_PATH, products);
        await writeFileAtomic(ORDERS_PATH, orders);
        return res.status(HTTP.CREATED).json(order);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

module.exports = router;
