"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("order_item", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            order_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "orders", key: "id" },
                onDelete: "CASCADE",
            },

            product_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "products", key: "id" },
            },

            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },

            unit_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("order_items");
    },
};
