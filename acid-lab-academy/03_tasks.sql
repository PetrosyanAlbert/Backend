-- =====================================================
-- PostgreSQL ACID Lab
-- Part 3 - Atomicity
-- =====================================================


-- -----------------------------------------------------
-- Task 3.1 - Transfer WITHOUT transaction
-- -----------------------------------------------------

-- Initial balances
SELECT id, full_name, balance_amd
FROM accounts
WHERE id IN (1, 2)
ORDER BY id;

-- Step 1: deduct money (no transaction)
UPDATE accounts
SET balance_amd = balance_amd - 10000
WHERE id = 1;

-- Step 2: intentionally failing statement
INSERT INTO transfers (from_account_id, to_account_id, amount_amd)
VALUES (1, 2, -10000);

-- Balances after failure
SELECT id, full_name, balance_amd
FROM accounts
WHERE id IN (1, 2)
ORDER BY id;

-- Transfers table (should be empty)
SELECT * FROM transfers;


-- -----------------------------------------------------
-- Task 3.2 - Transfer WITH transaction
-- -----------------------------------------------------

BEGIN;

UPDATE accounts
SET balance_amd = balance_amd - 10000
WHERE id = 1;

-- This statement fails
INSERT INTO transfers (from_account_id, to_account_id, amount_amd)
VALUES (1, 2, -10000);

UPDATE accounts
SET balance_amd = balance_amd + 10000
WHERE id = 2;

-- Transaction must be rolled back manually after error
ROLLBACK;

-- Verify balances remain unchanged
SELECT id, full_name, balance_amd
FROM accounts
WHERE id IN (1, 2)
ORDER BY id;


-- -----------------------------------------------------
-- Task 3.3 - SAVEPOINT usage
-- -----------------------------------------------------

BEGIN;

-- Safe operation
UPDATE accounts
SET balance_amd = balance_amd - 10000
WHERE id = 1;

SAVEPOINT before_transfer;

-- Failing operation
INSERT INTO transfers (from_account_id, to_account_id, amount_amd)
VALUES (1, 2, -10000);

-- Partial rollback
ROLLBACK TO SAVEPOINT before_transfer;

-- Valid operation after rollback
INSERT INTO transfers (from_account_id, to_account_id, amount_amd, note)
VALUES (1, 2, 10000, 'transfer logged after savepoint rollback');

COMMIT;

-- Final state check
SELECT id, full_name, balance_amd
FROM accounts
WHERE id = 1;

SELECT id, from_account_id, to_account_id, amount_amd, note
FROM transfers;

-- =====================================================
-- Part 4 - Isolation
-- =====================================================

-- =====================================================
-- Task 4.1 - Dirty Read (does not happen in PostgreSQL)
-- =====================================================

-- Session A
BEGIN;
UPDATE accounts
SET balance_amd = balance_amd + 7777
WHERE id = 2;
-- No COMMIT here

-- Session B
SELECT balance_amd
FROM accounts
WHERE id = 2;

-- Session A
ROLLBACK;


-- =====================================================
-- Task 4.2 - Non-repeatable Read
-- =====================================================

-- ---------- READ COMMITTED ----------

-- Session A
BEGIN ISOLATION LEVEL READ COMMITTED;
SELECT balance_amd FROM accounts WHERE id = 1;

-- Session B
BEGIN;
UPDATE accounts
SET balance_amd = balance_amd + 1000
WHERE id = 1;
COMMIT;

-- Session A
SELECT balance_amd FROM accounts WHERE id = 1;
COMMIT;


-- ---------- REPEATABLE READ ----------

-- Session A
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT balance_amd FROM accounts WHERE id = 1;

-- Session B
BEGIN;
UPDATE accounts
SET balance_amd = balance_amd + 1000
WHERE id = 1;
COMMIT;

-- Session A
SELECT balance_amd FROM accounts WHERE id = 1;
COMMIT;


-- =====================================================
-- Task 4.3 - Phantom Read
-- =====================================================

-- ---------- READ COMMITTED ----------

-- Session A
BEGIN ISOLATION LEVEL READ COMMITTED;
SELECT COUNT(*) FROM accounts WHERE balance_amd >= 10000;

-- Session B
INSERT INTO accounts (full_name, balance_amd, status)
VALUES ('Phantom User', 15000, 'active');

-- Session A
SELECT COUNT(*) FROM accounts WHERE balance_amd >= 10000;
COMMIT;

-- Cleanup
DELETE FROM accounts WHERE full_name = 'Phantom User';


-- ---------- REPEATABLE READ ----------

-- Session A
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT COUNT(*) FROM accounts WHERE balance_amd >= 10000;

-- Session B
INSERT INTO accounts (full_name, balance_amd, status)
VALUES ('Phantom User', 15000, 'active');

-- Session A
SELECT COUNT(*) FROM accounts WHERE balance_amd >= 10000;
COMMIT;

-- Cleanup
DELETE FROM accounts WHERE full_name = 'Phantom User';


-- =====================================================
-- Task 4.4 - Lost Update
-- =====================================================

-- ---------- Broken version (read → compute → write) ----------

-- Session A
BEGIN;
SELECT balance_amd FROM accounts WHERE id = 2;
-- application computes X + 5000
UPDATE accounts SET balance_amd = balance_amd + 5000 WHERE id = 2;
-- no commit yet

-- Session B
BEGIN;
SELECT balance_amd FROM accounts WHERE id = 2;
-- application computes X + 2000
UPDATE accounts SET balance_amd = balance_amd + 2000 WHERE id = 2;
COMMIT;

-- Session A
COMMIT;


-- ---------- Fixed version (atomic update) ----------

-- Session A
BEGIN;
UPDATE accounts
SET balance_amd = balance_amd + 5000
WHERE id = 2;

-- Session B
BEGIN;
UPDATE accounts
SET balance_amd = balance_amd + 2000
WHERE id = 2;
COMMIT;

-- Session A
COMMIT;


-- =====================================================
-- Task 4.5 - SERIALIZABLE anomaly
-- =====================================================

-- Prepare balance
UPDATE accounts SET balance_amd = 15000 WHERE id = 5;

-- Session A
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT balance_amd FROM accounts WHERE id = 5;
UPDATE accounts
SET balance_amd = balance_amd - 10000
WHERE id = 5;
-- keep transaction open

-- Session B
BEGIN ISOLATION LEVEL SERIALIZABLE;
SELECT balance_amd FROM accounts WHERE id = 5;
UPDATE accounts
SET balance_amd = balance_amd - 10000
WHERE id = 5;
COMMIT;

-- Session A
COMMIT;

-- =====================================================
-- Part 5 - Durability
-- Task 5.1 - Verify durability after COMMIT
-- =====================================================

BEGIN;

UPDATE accounts
SET balance_amd = balance_amd - 5000
WHERE id = 1;

UPDATE accounts
SET balance_amd = balance_amd + 5000
WHERE id = 2;

INSERT INTO transfers (from_account_id, to_account_id, amount_amd, note)
VALUES (1, 2, 5000, 'durability test transfer');

COMMIT;
