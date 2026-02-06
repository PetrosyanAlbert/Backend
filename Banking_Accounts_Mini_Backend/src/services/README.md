🏦 Banking Accounts Mini Backend

Node.js + PostgreSQL (pg)
A small banking backend system that supports customers, accounts, and atomic money operations.
This project demonstrates:
Proper relational database design
Transaction-safe money operations
PostgreSQL row-level locking (FOR UPDATE)
ACID-compliant transfers
Clean backend architecture (routes → controllers → services)

✨ Features
Customers
Create a customer
Automatically create a default account on customer creation
Get customer details with associated accounts
Accounts
Get account details
Change account status (active, frozen, closed)
Deposit money
Transfer money between accounts
Money Operations
All money operations are executed inside database transactions
Row-level locks prevent race conditions and lost updates
Account balance can never become negative
Duplicate transactions are prevented using a unique reference
Ledger & Audit
All money movements are stored in the transactions ledger
All actions are logged in audit_logs

🛠 Tech Stack

Node.js
Express
PostgreSQL
pg
dotenv

📁 Project Structure
.
├── server.js # Application entry point
├── package.json
├── .env.example
├── README.md
└── src/
├── app.js # Express app configuration
├── db/
│ ├── pool.js
│ └── config.js
├── routes/
│ ├── customers.routes.js
│ ├── accounts.routes.js
│ └── transfers.routes.js
├── controllers/
│ ├── customers.controller.js
│ ├── accounts.controller.js
│ └── transfers.controller.js
├── services/
│ ├── customers.service.js
│ ├── accounts.service.js
│ └── transfers.service.js
├── errors/
│ ├── ApiError.js
│ ├── BadRequestError.js
│ ├── NotFoundError.js
│ └── ConflictError.js
└── middlewares/
└── error.middleware.js

🗄 Database Schema
customers
id SERIAL PRIMARY KEY
full_name TEXT NOT NULL
email TEXT UNIQUE NOT NULL
phone TEXT
created_at TIMESTAMP DEFAULT NOW()

accounts
id SERIAL PRIMARY KEY
customer_id INT REFERENCES customers(id)
currency TEXT CHECK (currency IN ('AMD','USD','EUR'))
balance BIGINT NOT NULL DEFAULT 0
status TEXT CHECK (status IN ('active','frozen','closed'))
created_at TIMESTAMP DEFAULT NOW()

transactions (ledger)
id SERIAL PRIMARY KEY
type TEXT CHECK (type IN ('deposit','withdraw','transfer'))
from_account_id INT
to_account_id INT
amount BIGINT NOT NULL
reference TEXT UNIQUE NOT NULL
note TEXT
created_at TIMESTAMP DEFAULT NOW()

audit_logs
id SERIAL PRIMARY KEY
action TEXT NOT NULL
meta JSONB NOT NULL
created_at TIMESTAMP DEFAULT NOW()

🔒 Business Rules
Account balances are stored as BIGINT
Money calculations are done only in the service layer
FOR UPDATE is used to prevent race conditions
Frozen or closed accounts cannot perform money operations
Transfers are atomic
Transaction reference guarantees idempotency

⚙️ Setup & Run
1️⃣ Clone repository
git clone <repository-url>
cd Banking_Accounts_Mini_Backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env
PORT=3001

DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=banking

4️⃣ Create database
CREATE DATABASE banking;

5️⃣ Create tables

Run the SQL schema described above.

6️⃣ Start server
node server.js

# or

npm run dev

📡 API Endpoints
Customers
POST /api/customers
GET /api/customers/:id

Accounts
GET /api/accounts/:id
PATCH /api/accounts/:id/status
POST /api/accounts/:id/deposit

Transfers
POST /api/transfers

🧪 Transfer Example
POST /api/transfers

{
"fromAccountId": 1,
"toAccountId": 2,
"amount": 10000,
"reference": "TR-001",
"note": "Rent payment"
}
