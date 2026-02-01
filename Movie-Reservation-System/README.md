# 🎬 Movie Reservation System

Backend application for a movie reservation platform built with **Node.js**, **Express**, and **PostgreSQL**.

This project demonstrates:
- relational database design
- SQL relationships (1:N, N:M, 1:1)
- JOIN types (INNER, LEFT, FULL OUTER)
- aggregation with GROUP BY and SUM
- backend API design over a relational database

---

## 📌 Project Goals

The goal of this project is to deeply understand:

- how to design a relational database
- how entities are connected via foreign keys
- how to write correct SQL JOIN queries
- how to expose database data through a clean REST API
- how backend applications communicate with PostgreSQL

This project focuses on **backend and database logic only**.  
There is **no authentication and no frontend**.

---

## 🗂 Project Structure

movie-reservation/
├─ sql/
│ ├─ 01_schema.sql # Database schema
│ ├─ 02_seed.sql # Sample data
│ ├─ 03_joins.sql # JOIN examples
│ └─ 04_reports.sql # Analytical reports
│
├
│─ config/
│ └─ db.config.js # Database configuration
│─ db/
│ │ └─ pool.js # PostgreSQL connection pool
│─ routes/
│ ├─ movies.routes.js
│ ├─ users.routes.js
│ ├─ reservations.routes.js
│ └─ reports.routes.js
│─app.js # Express app configuration
│─ server.js # Server startup
│
├─ .env
├─ package.json
└─ README.md

## 🗄 Database

**Database name:**  
movie_reservation


### Main entities:
- users
- movies
- halls
- seats
- screenings
- reservations
- reservation_seats (junction table)
- payments

### Relationships:
- **1:N** → movies → screenings  
- **1:N** → users → reservations  
- **N:M** → reservations ↔ seats (via reservation_seats)  
- **1:1** → reservations ↔ payments  

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

PORT=3001

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=movie_reservation

▶️ How to Run the Project

1️⃣ Install dependencies
npm install

2️⃣ Create and seed the database
psql movie_reservation < sql/01_schema.sql
psql movie_reservation < sql/02_seed.sql
(Optional, for reference and learning)
psql movie_reservation < sql/03_joins.sql
psql movie_reservation < sql/04_reports.sql

3️⃣ Start the backend server
node server/server.js
Server will run at:

http://localhost:3001
🌐 API Endpoints
🎬 Movies
Get all movies
GET /movies
Response:

[
  {
    "id": 1,
    "title": "Inception",
    "duration_min": 148,
    "age_rating": "PG-13",
    "release_year": 2010
  }
]
Get screenings of a movie
GET /movies/:id/screenings
👤 Users
Get reservations of a user
GET /users/:id/reservations
Returns all reservations that belong to a registered user.

🎟 Reservations
Get reservation details
GET /reservations/:id
Returns:
user info
hall
selected seats
movie start time

Get unpaid reservations
GET /reservations/unpaid
Uses LEFT JOIN + IS NULL logic.

📊 Reports
Movie revenue report
GET /reports/movies-revenue
Response:

[
  {
    "movie_id": 1,
    "movie_title": "Inception",
    "total_revenue_amd": 8400
  }
]
🧠 Key SQL Concepts Demonstrated

INNER JOIN

LEFT JOIN

FULL OUTER JOIN

Many-to-Many relationships

Junction tables

Anti-join (LEFT JOIN ... IS NULL)

GROUP BY, COUNT, SUM

Parameterized queries ($1)

✅ Project Status
✔ Database schema completed
✔ Seed data created
✔ SQL JOINs implemented
✔ Analytical reports implemented
✔ Backend API completed


Author: Albert Petrosyan
Tech stack: Node.js, Express, PostgreSQL


