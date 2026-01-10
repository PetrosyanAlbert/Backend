const express = require("express");
const { randomUUID } = require("node:crypto");
const path = require("node:path");
const auth = require("../middleware/auth.middleware");
const authRole = require("../middleware/role.middleware");
const { readFile, writeFileAtomic } = require("../utils/jsonStore");
const validateProduct = require("../utils/validateProduct");
const HTTP = require("../utils/httpStatus");

const router = express.Router();
const PRODUCTS_PATH = path.join(__dirname, "../data/products.json");

router.get("/", async (_, res) => {
    try {
        const products = await readFile(PRODUCTS_PATH);
        return res.json(products);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const products = await readFile(PRODUCTS_PATH);
        const product = products.find((p) => p.id === req.params.id);
        if (!product) {
            return res.status(HTTP.NOT_FOUND).json({ message: "Product not found" });
        }
        return res.json(product);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

router.post("/", auth, authRole("admin"), async (req, res) => {
    try {
        validateProduct(req.body);
        const { name, price, stock } = req.body;
        const products = await readFile(PRODUCTS_PATH);
        const product = {
            id: randomUUID(),
            name,
            price,
            stock,
            createdAt: new Date().toISOString(),
        };
        products.push(product);
        await writeFileAtomic(PRODUCTS_PATH, products);
        return res.status(HTTP.CREATED).json(product);
    } catch (err) {
        return res.status(HTTP.BAD_REQUEST).json({ message: err.message });
    }
});

router.patch("/:id", auth, authRole("admin"), async (req, res) => {
    try {
        validateProduct(req.body, true);
        const products = await readFile(PRODUCTS_PATH);
        const idx = products.findIndex((p) => p.id === req.params.id);
        if (idx === MAGIC_NUMBERS.MINUS_ONE) {
            return res.status(HTTP.NOT_FOUND).json({ message: "Product not found" });
        }
        Object.assign(products[idx], req.body);
        await writeFileAtomic(PRODUCTS_PATH, products);
        return res.json(products[idx]);
    } catch (err) {
        return res.status(HTTP.BAD_REQUEST).json({ message: err.message });
    }
});

router.delete("/:id", auth, authRole("admin"), async (req, res) => {
    try {
        const products = await readFile(PRODUCTS_PATH);
        const idx = products.findIndex((p) => p.id === req.params.id);
        if (idx === MAGIC_NUMBERS.MINUS_ONE) {
            return res.status(HTTP.NOT_FOUND).json({ message: "Product not found" });
        }
        const deleted = products.splice(idx, MAGIC_NUMBERS.ONE)[MAGIC_NUMBERS.ZERO];
        await writeFileAtomic(PRODUCTS_PATH, products);
        return res.json(deleted);
    } catch (err) {
        return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
});

module.exports = router;
