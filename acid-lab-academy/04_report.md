# PostgreSQL ACID Lab Report

## Part 3 - Atomicity

### Task 3.1 - Transfer without transaction

**Observation:**
A money transfer was executed without wrapping the operations inside a
transaction. The balance was deducted from the source account, but the
subsequent INSERT into the transfers table failed due to a CHECK constraint
violation. As a result, the destination account was not credited and no
transfer record was created.

**Explanation:**
Without an explicit transaction, PostgreSQL treats each statement
independently. When one statement fails, previously executed statements
remain committed. This leads to a partially applied business operation,
violating Atomicity, which requires all operations to succeed or none.

---

### Task 3.2 - Transfer with transaction

**Observation:**
All transfer operations were executed inside a transaction using BEGIN.
When the INSERT statement failed due to a constraint violation, PostgreSQL
marked the transaction as aborted. After performing ROLLBACK, all changes
were undone and account balances remained unchanged.

**Explanation:**
Transactions guarantee Atomicity by grouping multiple statements into a
single unit of work. If any statement fails, PostgreSQL ensures that none
of the changes are committed, preserving database consistency.

---

### Task 3.3 - SAVEPOINT usage

**Observation:**
After an invalid INSERT caused an error, the transaction was rolled back to
a previously defined SAVEPOINT. This allowed the transaction to continue,
execute a valid operation, and successfully commit the remaining changes.

**Explanation:**
SAVEPOINT provides fine-grained control over Atomicity by allowing partial
rollbacks within a transaction. Instead of aborting the entire transaction,
PostgreSQL can recover from localized errors and continue executing valid
operations.

---

### Task 5.1 - Durability after COMMIT

**Observation:**
A valid transfer was executed and committed. After disconnecting from psql
and reconnecting to the database, the transfer record and updated account
balances were still present.

**Explanation:**
Durability guarantees that once a transaction is committed, its changes are
permanently stored. Even after closing the database connection, PostgreSQL
preserved all committed data, demonstrating durability in practice.

