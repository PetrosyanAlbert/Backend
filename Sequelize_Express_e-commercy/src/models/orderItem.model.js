const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const OrderItem = sequelize.define(
        "OrderItem",
        {
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "order_id",
            },

            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "product_id",
            },

            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            unitPrice: {
                type: DataTypes.INTEGER,
                field: "unit_price",
                allowNull: false,
            },
        },
        {
            tableName: "order_item",
            underscored: true,
            timestamps: false,
        },
    );

    return OrderItem;
};
