const { sequelize } = require("../config/db");

const User = require("./user.model")(sequelize);
const Product = require("./product.model")(sequelize);
const Order = require("./order.model")(sequelize);
const OrderItem = require("./orderItem.model")(sequelize);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

module.exports = { sequelize, User, Product, Order, OrderItem };
