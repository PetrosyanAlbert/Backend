# Library Management System (Express + EJS + JSON Storage)

A small server-rendered Library Management System built with **Node.js**, **Express**, and **EJS**.  
Supports **authentication**, **role-based authorization**, **book catalog browsing**, and **borrow/return** flows with **persistent JSON file storage**.

---

## Features

### Authentication
- Register (creates **member** accounts only)
- Login (session-based)
- Logout (destroys session)

### Authorization (Roles)
- **admin (librarian)**: manage books + view users
- **member**: browse books, borrow, return, view own loans

### Books
- List all books with availability
- View book details
- Borrow/Return flow (availability + active loan constraints)

### Storage
All persistent data is stored in local JSON files:
- `data/users.json`
- `data/books.json`
- `data/loans.json`

---

## Tech Stack
- Node.js
- Express
- EJS (Server-Side Rendering)
- express-session (sessions)
- bcrypt (password hashing)
- JSON file storage (custom `jsonStore`)

---

## Project Structure
project/
app.js
package.json
.env
.env.example

data/
users.json
books.json
loans.json

src/
routes/
auth.routes.js
books.routes.js
admin.routes.js

middlewares/
  requireAuth.js
  requireAdmin.js
  attachUser.js

services/
  jsonStore.js
  user.service.js
  book.service.js
  loan.service.js

utils/
  id.js
  validators.js
  MAGIC_NUMBERS.js
views/
partials/
nav.ejs

pages/
  index.ejs
  login.ejs
  register.ejs
  books.ejs
  book-details.ejs
  my-loans.ejs
  admin-dashboard.ejs
  admin-book-form.ejs
  admin-users.ejs
  403.ejs
  404.ejs
public/
css/
style.css
images/
books/


---

## Setup

### 
1) Install dependencies
npm install

2) Create .env
Create a .env file in the project root:

PORT=3001
SESSION_SECRET=your_secret_here

You can copy from .env.example.

3) Seed data (admin user + sample books)
Make sure you have these files:
data/users.json
data/books.json
data/loans.json

Example initial structure:
data/users.json
[
  {
    "id": "u_admin",
    "name": "Admin",
    "email": "admin@mail.com",
    "passwordHash": "<bcrypt-hash>",
    "role": "admin",
    "createdAt": "2026-01-14T10:00:00.000Z"
  }
]

Important: Passwords must be stored hashed with bcrypt.

4) Run the server
Add scripts to package.json:
"scripts": {
  "dev": "node --watch app.js",
  "start": "node app.js"
}

Run:
npm run dev
Server will start at:
http://localhost:3001

Seeded Admin Credentials
Set these based on your seeded users.json:

Email: admin@mail.com
Password: (the plain password you used to generate the bcrypt hash)

Routes

Public
GET / — Landing page (if authenticated redirect to /books)

GET /login — Login form

POST /login — Login action

GET /register — Register form

POST /register — Register action (member only)

Authenticated
GET /books — List all books

GET /books/:id — Book details

POST /books/:id/borrow — Borrow book (only if available)

POST /books/:id/return — Return book (only if borrowed by current user)

GET /me/loans — My borrowed books

Admin (protected)
GET /admin — Admin dashboard

GET /admin/books — Manage books list

GET /admin/books/new — Add book form

POST /admin/books — Create book

GET /admin/books/:id/edit — Edit book form

POST /admin/books/:id — Update book

POST /admin/books/:id/delete — Delete book

GET /admin/users — List users

Authorization Rules
UI-level (EJS)
Admin-only links are rendered only if:

<% if (currentUser && currentUser.role === "admin") { %>
  ...
<% } %>

Route-level (Middleware)

Not authenticated → redirect /login

Authenticated but not admin → render 403.ejs

Borrow/Return Rules

A book can have only one active loan (returnedAt = null)

Borrow is allowed only if:

book exists

book is available

no active loan exists for the book

Return is allowed only if:

active loan exists for current user + book

return sets returnedAt

book becomes available again