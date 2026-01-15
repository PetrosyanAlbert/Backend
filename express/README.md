🧩 Mini Express-like Framework (Node.js)

A minimal Express-like framework built from scratch using Node.js core http module.
This project demonstrates how middleware, routing, body parsing, error handling, and REST APIs work under the hood — without using Express or any third-party frameworks.

📌 Features
Framework Core

✅ Middleware chaining with next()

✅ Error middleware: next(err) and (err, req, res, next)

✅ HTTP routing: GET, POST, PUT, DELETE

✅ Route parameters: /users/:id → req.params

✅ Query parsing: ?x=10&y=20 → req.query

✅ Custom response helpers (res.status, res.set, res.send, res.json)

✅ 404 handling for unmatched routes

✅ 500 handling for unhandled errors

Body Parsers (Middlewares)

✅ application/json

✅ application/x-www-form-urlencoded

Demo API

/health

/echo-json

/echo-form

/query

Full CRUD for /users

Error demo endpoint: /boom

📁 Project Structure
project-root/
├── framework/
│ ├── createApp.js
│ ├── helpers/
│ │ ├── comparisonOfPath.js
│ │ └── statusCodes.js
│ └── middlewares/
│ ├── jsonParser.js
│ └── urlencodedParser.js
│
├── app/
│ └── server.js
│
├── package.json
└── README.md

🚀 Getting Started
1️⃣ Install dependencies
npm install

2️⃣ Configure environment

Create a .env file in the root directory:

PORT=3001

3️⃣ Run the server
node app/server.js

Expected output:

Server running on http://localhost:3001

🧠 How the Framework Works
🔹 Middleware Engine

Each middleware has the signature:

(req, res, next)

Error middleware:

(err, req, res, next)

Flow:

All app.use() middlewares execute in order.

When next() is called → control passes to the next middleware.

When next(err) is called → normal middleware is skipped, and only error middleware is executed.

🔹 Routing System

Routes are stored internally by HTTP method:

routes = {
GET: [],
POST: [],
PUT: [],
DELETE: []
}

When a request arrives:

The framework checks req.method.

It iterates over the corresponding route list.

Path matching is done via:

comparisonOfPath(route.path, req.path)

If matched:

req.params is populated

The route handler is executed

🔹 Route Parameters

Example:

Route: /users/:id
Request: /users/42

Inside handler:

req.params = { id: "42" }

🔹 Body Parsing
JSON

Content-Type:

application/json

Parsed via:

req.on("data")
req.on("end")
JSON.parse(...)

URL Encoded

Content-Type:

application/x-www-form-urlencoded

Parsed using:

new URLSearchParams(body)

Both parsers attach:

req.body = { ... }

🧪 API Endpoints
✅ Health Check
GET /health

Response:

{ "ok": true }

✅ Echo JSON
POST /echo-json
Content-Type: application/json

Body:

{ "a": 1 }

Response:

{ "received": { "a": 1 } }

✅ Echo Form Data
POST /echo-form
Content-Type: application/x-www-form-urlencoded

Body:

name=John&age=25

Response:

{ "received": { "name": "John", "age": "25" } }

✅ Query Parsing
GET /query?x=10&y=20

Response:

{
"query": { "x": "10", "y": "20" }
}

👥 Users API (CRUD)
➕ Create User
POST /users
Content-Type: application/json

Body:

{ "name": "John" }

Response:

{ "id": "1700000000000", "name": "John" }

📥 Get User
GET /users/:id

200:

{ "id": "1700000000000", "name": "John" }

404:

{ "error": "User not found" }

✏️ Update User
PUT /users/:id
Content-Type: application/json

Body:

{ "name": "Johnny" }

Response:

{ "id": "1700000000000", "name": "Johnny" }

❌ Delete User
DELETE /users/:id

Response:

HTTP/1.1 204 No Content

💥 Error Handling
Trigger Error
GET /boom

Response:

{
"error": "Internal Server Error",
"message": "Boom"
}

This is handled by a global error middleware:

app.use((err, req, res, next) => {
console.error("ERROR:", err.message);
res.statusCode = 500;
res.json({
error: "Internal Server Error",
message: err.message
});
});

🛠 Manual Testing (curl)
Health
curl -i http://localhost:3001/health

JSON
curl -i -H "Content-Type: application/json" \
 -d '{"a":1}' \
 http://localhost:3001/echo-json

Form
curl -i -H "Content-Type: application/x-www-form-urlencoded" \
 -d "name=John&age=25" \
 http://localhost:3001/echo-form

Query
curl -i "http://localhost:3001/query?x=10&y=20"

Users
curl -i -H "Content-Type: application/json" -d '{"name":"John"}' http://localhost:3001/users
curl -i http://localhost:3001/users/<ID>
curl -i -X PUT -H "Content-Type: application/json" -d '{"name":"Johnny"}' http://localhost:3001/users/<ID>
curl -i -X DELETE http://localhost:3001/users/<ID>

Error
curl -i http://localhost:3001/boom

🎯 Project Goals

This project was built to:

Understand backend architecture from scratch

Learn how middleware chains work

Implement routing without frameworks

Parse request bodies manually

Handle errors using next(err)

Simulate a real Express-like environment
