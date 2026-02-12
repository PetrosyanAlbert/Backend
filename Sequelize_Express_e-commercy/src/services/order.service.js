const { User, Order, sequelize, Product, OrderItem } = require("../models");
const BadRequestError = require("../utils/BadRequestError");
const NotFoundError = require("../utils/NotFoundError");

const createOrder = async ({ userId }) => {
    const id = Number(userId);
    if (Number.isNaN(id)) throw new BadRequestError("Invalid user id");
    const user = await User.findByPk(id);
    if (!user) throw new NotFoundError("User not found");
    const order = await Order.create({
        userId: id,
        status: "pending",
        totalPrice: 0,
    });
    return order;
};

const addItemToOrder = async ({ orderId, productId, quantity }) => {
    const oId = Number(orderId);
    const pId = Number(productId);
    const q = Number(quantity);
    if ([oId, pId, q].some(Number.isNaN) || q <= 0) {
        throw new BadRequestError("Invalid orderId, productId or quantity");
    }
    const t = await sequelize.transaction();
    try {
        const order = await Order.findByPk(oId, { transaction: t });
        if (!order) throw new NotFoundError("Order not found");
        if (order.status !== "pending")
            throw new BadRequestError("Only pending orders can be modified");
        const product = await Product.findByPk(pId);
        if (!product) throw new NotFoundError("Product not found");
        if (product.stock < q) throw new BadRequestError("Not enough stock");
        await product.update({ stock: product.stock - q }, { transaction: t });
        const item = await OrderItem.create(
            {
                orderId: order.id,
                productId: product.id,
                quantity: q,
                unitPrice: product.price,
            },
            { transaction: t },
        );
        order.totalPrice += product.price * q;
        await order.save({ transaction: t });
        await t.commit();
        return { order, item };
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

const getOrderById = async (id) => {
    const orderId = Number(id);
    if (Number.isNaN(orderId)) throw new BadRequestError("Invalid order id");
    const order = await Order.findByPk(orderId, {
        include: [
            {
                model: User,
                attributes: ["id", "fullName", "email"],
            },
            {
                model: OrderItem,
                include: [
                    {
                        model: Product,
                        attributes: ["id", "title", "price"],
                    },
                ],
            },
        ],
    });
    if (!order) throw new NotFoundError("Order not found");
    return order;
};

const updateOrderStatus = async (orderId, status) => {
    const id = Number(orderId);
    if (Number.isNaN(id)) throw new BadRequestError("Invalid order id");
    if (!["paid", "canceled"].includes(status))
        throw new BadRequestError("Invalid status");
    const t = await sequelize.transaction();
    try {
        const order = await Order.findByPk(id, { transaction: t });
        if (!order) throw new NotFoundError("Order not found");
        if (order.status !== "pending")
            throw new BadRequestError("Only pending orders can change status");
        if (status === "cancelled") {
            const items = await OrderItem.findAll(
                { where: { orderId: order.id } },
                { transaction: t },
            );
            for (const item of items) {
                const product = await Product.findByPk(item.id, {
                    transaction: t,
                });
                if (product) {
                    await product.update(
                        { stock: product.stock + item.quantity },
                        { transaction: t },
                    );
                }
            }
        }
        await order.update({ status }, { transaction: t });
        await t.commit();
        return order;
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

const getOrdersByUserId = async (userId) => {
    const id = Number(userId);
    if (Number.isNaN(id)) throw new BadRequestError("Invalid user id");
    const order = await Order.findAll({ where: { userId: id } });
    return order;
};

module.exports = {
    createOrder,
    addItemToOrder,
    getOrderById,
    updateOrderStatus,
    getOrdersByUserId,
};
