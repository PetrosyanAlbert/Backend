const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            fullName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "full_name",
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            role: {
                type: DataTypes.ENUM("user", "admin"),
                allowNull: false,
                defaultValue: "user",
            },
        },
        {
            tableName: "users",
            underscored: true,
            timestamps: true,
        },
    );

    return User;
};
