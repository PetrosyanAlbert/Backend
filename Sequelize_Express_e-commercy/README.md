🛒 E-Commerce API
Express + Sequelize + PostgreSQL

🚀 Tech Stack
Node.js
Express
PostgreSQL
Sequelize ORM
sequelize-cli
Swagger (OpenAPI 3.0)

📂 Project Structure

project/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── config.js        # sequelize-cli config
│   │   └── db.js            # runtime DB connection
│   │
│   ├── models/
│   │   ├── index.js
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── order.model.js
│   │   └── orderItem.model.js
│   │
│   ├── migrations/
│   │   ├── create-users.js
│   │   ├── create-products.js
│   │   ├── create-orders.js
│   │   └── create-order-items.js
│   │
│   ├── routes/
│   │   ├── index.js
│   │   ├── user.routes.js
│   │   ├── product.routes.js
│   │   └── order.routes.js
│   │
│   ├── controllers/
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   └── order.controller.js
│   │
│   ├── services/
│   │   ├── user.service.js
│   │   ├── product.service.js
│   │   └── order.service.js
│   │
│   ├── middlewares/
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── BadRequestError.js
│   │   ├── NotFoundError.js
│   │   └── ConflictError.js
│   │
│   └── swagger/
│       ├── index.js
│       ├── components.js
│       ├── users.swagger.js
│       ├── products.swagger.js
│       └── orders.swagger.js
|
│── server.js
├── .env
├── .env.example
├── .sequelizerc
├── package.json
└── README.md

⚙️ Environment Variables
Create .env file based on .env.example:

DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASS=postgres
PORT=3001

📦 Installation
npm install

🗄️ Database Setup (Sequelize CLI)
Create database
npm run db:create

Run migrations
npm run db:migrate

Reset database
npm run db:reset


⚠️ Important:
Tables are created ONLY via migrations
sequelize.sync() is NOT used

▶️ Run Server
npm run dev


Server will start on:
http://localhost:3001

📘 API Documentation (Swagger)
Swagger UI available at:
http://localhost:3001/api-docs


Implemented using OpenAPI 3.0.

🧠 Architecture Overview
Layered Architecture
Route → Controller → Service → Model


Routes — map URL to controller
Controllers — handle HTTP (req / res)
Services — business logic + transactions
Models — Sequelize ORM models
Migrations — database schema

🧑 Users API
Method	Endpoint	Description
GET	/users	Get all users
GET	/users/:id	Get user by id
POST	/users	Create user
📦 Products API
Method	Endpoint	Description
GET	/products	List products
POST	/products	Create product
PATCH	/products/:id	Update product
🛒 Orders API
Method	Endpoint	Description
POST	/orders	Create empty order
GET	/orders/:id	Get order with items
POST	/orders/:id/items	Add item to order
PATCH	/orders/:id/status	Change order status
GET	/users/:id/orders	Get user orders
🔁 Order Status Flow
pending → paid
pending → cancelled


Rules:
Only pending orders can change status
On cancelled → product stock is restored
All multi-step operations use transactions

🔐 Error Handling

Custom error system with base ApiError:
400 BadRequestError
404 NotFoundError
409 ConflictError
Centralized error middleware ensures consistent responses.

🧩 Sequelize Associations

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);