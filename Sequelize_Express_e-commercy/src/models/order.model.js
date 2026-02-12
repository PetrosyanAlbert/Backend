const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Order = sequelize.define(
        "Order",
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "user_id",
            },

            status: {
                type: DataTypes.ENUM("pending", "paid", "cancelled"),
                defaultValue: "pending",
            },

            totalPrice: {
                type: DataTypes.INTEGER,
                field: "total_price",
                defaultValue: 0,
            },
        },
        {
            tableName: "orders",
            underscored: true,
            timestamps: true,
        },
    );

    return Order;
};
