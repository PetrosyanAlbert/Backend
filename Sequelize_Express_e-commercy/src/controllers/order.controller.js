const orderService = require("../services/order.service");

const create = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const order = await orderService.createOrder({ userId });
        return res.status(201).json({ data: order.toJSON() });
    } catch (err) {
        next(err);
    }
};

const addItem = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { productId, quantity } = req.body;
        const result = await orderService.addItemToOrder({
            orderId,
            productId,
            quantity,
        });
        return res.status(201).json({
            data: {
                order: result.order.toJSON(),
                item: result.item.toJSON(),
            },
        });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        return res.status(200).json({ data: order.toJSON() });
    } catch (err) {
        next(err);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(id, status);
        return res.status(200).json({ data: order.toJSON() });
    } catch (err) {
        next(err);
    }
};

const getByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const orders = await orderService.getOrdersByUserId(id);
        return res.status(200).json({ data: orders.map((o) => o.toJSON()) });
    } catch (err) {
        next(err);
    }
};

module.exports = { create, addItem, getById, updateStatus, getByUser };
