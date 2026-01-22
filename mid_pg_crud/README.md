Backend Mid Task — PostgreSQL CRUD (No Relations)

This project demonstrates core PostgreSQL CRUD skills using multiple independent tables
without relations, joins, foreign keys, or dependencies between entities.

The focus is on:
database schema design
constraints and data integrity
SQL CRUD operations
clean separation of schema and queries
real-world backend modeling

Project Structure
mid_pg_crud/
├ schema.sql    # database schema + constraints
├ queries.sql   # seed data + select + update + delete
└ README.md     # documentation

Database Setup
1. Start PostgreSQL
Make sure PostgreSQL is running on your system.

2. Open psql
psql

3. Create database
CREATE DATABASE mid_pg_crud;

4. Connect to database:
\c mid_pg_crud

Run Schema:
Execute schema file to create tables and constraints:
\i schema.sql
or from terminal:
psql -d mid_pg_crud -f schema.sql

Run Queries:
Execute seed + CRUD queries:
\i queries.sql
or from terminal:
psql -d mid_pg_crud -f queries.sql

Tables:
The project contains 4 independent tables:
students
courses
support_tickets
inventory_items
There are no relations, joins, or foreign keys between tables.

Constraints Design:
The database schema enforces data integrity using SQL constraints:
Common Constraints:
PRIMARY KEY — unique row identification
NOT NULL — required fields
DEFAULT — default values
UNIQUE — uniqueness enforcement
CHECK — domain validation

students:
email → UNIQUE
status → CHECK (status IN ('active','paused','dropped'))
created_at → DEFAULT NOW()

courses:
level → CHECK (level IN ('beginner','intermediate','advanced'))
price_amd → CHECK (price_amd >= 0)
is_published → DEFAULT FALSE
support_tickets
priority → CHECK (priority IN ('low','medium','high'))
state → CHECK (state IN ('open','in_progress','resolved','closed'))

inventory_items:
quantity → CHECK (quantity >= 0)
unit_price_amd → CHECK (unit_price_amd >= 0)
is_available → DEFAULT TRUE
updated_at → DEFAULT NOW()

CRUD Coverage:
Create:
INSERT seed data for all tables

Read:
filtered queries
sorted queries
projections
calculated fields
time-based queries

Update:
status transitions
publishing logic
restocking logic
timestamp updates

Delete:
safe deletes using WHERE clauses
controlled data removal

Architecture Principles:
Schema-first design
Domain validation at DB level
Separation of concerns:
schema.sql → structure + rules
queries.sql → operations
No application-layer assumptions
No relational dependencies
Clean data modeling
ACID-safe constraints

Educational Purpose:
This project is designed to teach:
SQL schema modeling
PostgreSQL constraints
data integrity
backend data architecture
CRUD lifecycle
domain validation
production-style SQL structure
schema vs data separation
database-first thinking

Execution Flow
schema.sql  → create structure + constraints
queries.sql → insert data + operate on data

Reset Database (if needed)
\c postgres
DROP DATABASE mid_pg_crud;
CREATE DATABASE mid_pg_crud;
\c mid_pg_crud
\i schema.sql
\i queries.sql

Notes:
No foreign keys
No joins
No relations
All tables are independent
All validation is done via constraints
All operations use safe SQL patterns
All deletes use WHERE clauses
Designed as backend mid-level task

Author:
Albert Petrosyan
Backend Engineering Practice Task
PostgreSQL CRUD — No Relations