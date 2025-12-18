Node.js HTTP JSON Backend (No Frameworks)

Overview:
This project is a low-level HTTP backend built using only Node.js built-in modules, without any frameworks (such as Express or Fastify) and without a database.

The main goal of the project is to deeply understand how backend systems work under the hood, without hiding complexity behind abstractions.

This project intentionally avoids frameworks to expose the core mechanics of backend engineering.

Learning Goals:
This project focuses on understanding:
How HTTP servers work internally in Node.js
How routing can be implemented without frameworks
How the request/response lifecycle works
How to handle JSON persistence using the filesystem
How REST APIs are structured (CRUD)
How teams can work with Git branches and isolated modules

Technical Constraints:
Allowed: http, fs, path, url

Not Allowed:
Express, Fastify, or any other frameworks, Databases

All data is stored in JSON files.

Project Structure
node-http-json-backend/
│
├── data/
│ ├── users.json
│ ├── products.json
│ └── orders.json
│
├── src/
│ ├── server.js
│ │
│ ├── routes/
│ │ ├── users.routes.js
│ │ ├── products.routes.js
│ │ └── orders.routes.js
│ │
│ └── utils/
│ ├── bodyParser.js
│ ├── parseUrl.js
│ ├── sendResponse.js
│ └── jsonStorage.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md

Architecture Principles

1. Minimal server.js
   server.js is intentionally kept minimal.
   Responsibilities:
   Create HTTP server
   Receive req and res
   Forward the request to route modules
   server.js does not contain routing logic.

2. Route Modules (Self-Contained)
   Each route file is fully self-contained.
   Each module handles:
   Route matching
   Validation
   Data persistence
   Response formatting

Example export signature:
module.exports = function (req, res) {
   route matching
   validation
   JSON persistence
   response handling
};

3. Manual Routing
   Routing is done manually using:
   HTTP method
   URL pathname
   Resource ID (if present)
   There are no controllers and no services.

4. Chain of Responsibility
   server.js forwards the request to all route modules:
   usersRoutes(req, res);
   ordersRoutes(req, res);
   productsRoutes(req, res);

Data Persistence:
All data is stored in the /data directory as JSON files.

Rules:
Each file contains only an array

Data lifecycle:
Read from file
Modify in memory
Write back to file

Entity Schemas
User
{
"id": "string",
"name": "string",
"email": "string",
"role": "string",
"createdAt": "string",
"updatedAt": "string"
}

Rules:
email must be unique
createdAt is set once
updatedAt updates on every change

Product
{
"id": "string",
"title": "string",
"price": "number",
"inStock": "boolean",
"createdAt": "string",
"updatedAt": "string"
}

Rules:
price must be a number
inStock must be boolean

Order
{
"id": "string",
"title": "string",
"amount": "number",
"status": "string",
"createdAt": "string",
"updatedAt": "string"
}

Rules:
amount must be greater than 0
status must be one of:
pending
completed
cancelled

⚠️ There are no relations between entities.

API Endpoints
Users
GET /users
GET /users/:id
POST /users
PUT /users/:id
PATCH /users/:id
DELETE /users/:id

Products
GET /products
GET /products/:id
POST /products
PUT /products/:id
PATCH /products/:id
DELETE /products/:id

Orders
GET /orders
GET /orders/:id
POST /orders
PUT /orders/:id
PATCH /orders/:id
DELETE /orders/:id

HTTP Rules
Status Codes
Code Meaning
200 Successful GET / Update
201 Resource created
204 Resource deleted (no body)
400 Invalid request
404 Resource not found
405 Method not allowed
500 Internal server error
Headers

All responses include:
Content-Type: application/json

Environment Variables
.env
PORT=3000

.env.example
PORT=3000

How to Run:
npm install
node src/server.js

Server will start on:

http://localhost:3000

Why This Project Matters
No frameworks
No hidden abstractions
Full control over HTTP lifecycle
Deep understanding of backend fundamentals
This project demonstrates real backend engineering fundamentals, not framework usage.

License:
MIT
