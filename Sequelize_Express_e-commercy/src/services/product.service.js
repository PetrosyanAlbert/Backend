const { Op } = require("sequelize");
const { Product } = require("../models");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");

const createProduct = async ({ title, price, stock }) => {
    if (!title || price === null) {
        throw new BadRequestError("title and price are required");
    }
    const product = await Product.create({ title, price, stock });
    return product;
};

const getAllProducts = async ({
    limit = 10,
    offset = 0,
    minPrice,
    maxPrice,
}) => {
    const where = {};
    if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price[Op.gte] = Number(minPrice);
        if (maxPrice) where.price[Op.lte] = Number(maxPrice);
    }
    return Product.findAll({
        where,
        limit: Number(limit),
        offset: Number(offset),
    });
};

const updateProduct = async (id, data) => {
    const productId = Number(id);
    if (Number.isNaN(id)) {
        throw new BadRequestError("Invalid product id");
    }
    if (!data || Object.keys(data).length === 0) {
        throw new BadRequestError("No fields to update");
    }
    const allowed = ["title", "price", "stock"];
    const updateData = {};
    for (const key of allowed) {
        if (data[key] !== undefined) updateData[key] = data[key];
    }
    if (Object.keys(updateData).length === 0)
        throw new BadRequestError("No valid fields to update");
    const product = await Product.findByPk(productId);
    if (!product) throw new NotFoundError("Product not found");
    await product.update(updateData);
    return product;
};

module.exports = { createProduct, getAllProducts, updateProduct };
