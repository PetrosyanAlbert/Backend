"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("orders", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "users", key: "id" },
                onDelete: "CASCADE",
            },

            status: {
                type: Sequelize.ENUM("pending", "paid", "cancelled"),
                allowNull: false,
                defaultValue: "pending",
            },

            total_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },

            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },

            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("orders");
    },
};
