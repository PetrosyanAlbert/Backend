const productService = require("../services/product.service");

const create = async (req, res, next) => {
    try {
        const { title, price, stock } = req.body;
        const product = await productService.createProduct({
            title,
            price,
            stock,
        });
        return res.status(201).json({ data: product.toJSON() });
    } catch (err) {
        next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        const { limit, offset, minPrice, maxPrice } = req.query;
        const products = await productService.getAllProducts({
            limit,
            offset,
            minPrice,
            maxPrice,
        });
        return res.status(200).json({ data: products.map((p) => p.toJSON()) });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(id, req.body);
        return res.status(200).json({ data: product.toJSON() });
    } catch (err) {
        next(err);
    }
};

module.exports = { create, getAll, update };
