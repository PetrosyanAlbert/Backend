const pool = require("../db/pool");
const BadRequest = require("../errors/BadRequestError");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

const ALLOWED_CURRENCIES = ["AMD", "USD", "EUR"];
const ALLOWED_STATUSES = ["active", "frozen", "closed"];

module.exports.createAccount = async ({ customerId, currency }) => {
    if (!ALLOWED_CURRENCIES.includes(currency)) {
        throw new BadRequest("Invalid currency");
    }
    const { rowCount } = await pool.query(
        "SELECT 1 FROM customers WHERE id = $1",
        [customerId],
    );
    if (rowCount === 0) {
        throw new NotFoundError("Customer not found");
    }
    const { rows } = await pool.query(
        `
            INSERT INTO accounts (customer_id, currency, balance, status)
            VALUES ($1, $2, 0, 'active')
            RETURNING id, currency, balance, status
        `,
        [customerId, currency],
    );
    return rows[0];
};

module.exports.getAccountById = async (id) => {
    const { rows } = await pool.query(
        `
        SELECT
        id,
        customer_id,
        currency,
        balance,
        status,
        created_at
        FROM accounts
        WHERE id = $1
        `,
        [id],
    );
    if (rows.length === 0) {
        throw new NotFoundError("Account not found");
    }
    return rows[0];
};

module.exports.deposit = async ({ accountId, amount, reference, note }) => {
    const client = await pool.connect();
    try {
        if (amount <= 0) {
            throw new BadRequest("Amount must be greater than 0");
        }
        await client.query("BEGIN");

        const accountResult = await client.query(
            `
            SELECT id, balance, status
            FROM accounts
            WHERE id = $1
            FOR UPDATE
            `,
            [accountId],
        );
        if (accountResult.rowCount === 0) {
            throw new NotFoundError("Account not found");
        }
        const account = accountResult.rows[0];

        if (account.status !== "active") {
            throw new BadRequest("Account is not active");
        }

        const currentBalance = Number(account.balance);
        const depositAmount = Number(amount);

        if (!Number.isSafeInteger(depositAmount) || depositAmount <= 0) {
            throw new BadRequest("Invalid amount");
        }

        const newBalance = currentBalance + depositAmount;
        await client.query(
            `
            UPDATE accounts
            SET balance = $1
            WHERE id = $2
            `,
            [newBalance, accountId],
        );
        await client.query(
            `
            INSERT INTO transactions (type, to_account_id, amount, reference, note)
            VALUES ('deposit', $1, $2, $3, $4)
            `,
            [accountId, amount, reference, note || null],
        );
        await client.query(
            `
            INSERT INTO audit_logs(action, meta)
            VALUES ('deposit', $1)
            `,
            [JSON.stringify({ accountId, amount, reference })],
        );
        await client.query("COMMIT");
        return { accountId, balance: newBalance };
    } catch (err) {
        await client.query("ROLLBACK");
        if (err.code === "23505") {
            throw new ConflictError("Duplicate transaction reference");
        }
        throw err;
    } finally {
        client.release();
    }
};

module.exports.updateStatus = async ({ accountId, status }) => {
    if (!ALLOWED_STATUSES.includes(status)) {
        throw new BadRequest("Invalid status");
    }
    const { rows } = await pool.query(
        `
        UPDATE accounts
        SET status = $1
        WHERE id = $2
        RETURNING id, status
        `,
        [status, accountId],
    );
    if (rows.length === 0) {
        throw new NotFoundError("Account not found");
    }
    return rows[0];
};
