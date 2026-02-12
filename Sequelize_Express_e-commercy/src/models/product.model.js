const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        },
        {
            tableName: "products",
            underscored: true,
            timestamps: true,
        },
    );
    return Product;
};
