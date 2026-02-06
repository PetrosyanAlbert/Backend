const pool = require("../db/pool");
const BadRequest = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");

module.exports.transfer = async ({
    fromAccountId,
    toAccountId,
    amount,
    reference,
    note,
}) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const accountResult = await client.query(
            `
            SELECT id, balance, status
            FROM accounts
            WHERE id IN ($1, $2)
            ORDER BY id
            FOR UPDATE
            `,
            [fromAccountId, toAccountId],
        );
        if (accountResult.rowCount !== 2) {
            throw new NotFoundError("One or both accounts not found");
        }
        const from = accountResult.rows.find((f) => f.id === fromAccountId);
        const to = accountResult.rows.find((t) => t.id === toAccountId);
        if (from.status !== "active" || to.status !== "active") {
            throw new BadRequest("Both accounts must be active");
        }
        if (from.balance < amount) {
            throw new BadRequest("Insufficient funds");
        }
        await client.query(
            `
            UPDATE accounts SET balance = balance - $1 WHERE id = $2
            `,
            [amount, fromAccountId],
        );
        await client.query(
            `
            UPDATE accounts SET balance = balance + $1 WHERE id = $2
            `,
            [amount, toAccountId],
        );
        await client.query(
            `
            INSERT INTO transactions(type, from_account_id, to_account_id, amount, reference, note)
            VALUES ('transfer', $1, $2, $3, $4, $5)
            `,
            [fromAccountId, toAccountId, amount, reference, note || null],
        );
        await client.query(
            `
            INSERT INTO audit_logs(action, meta)
            VALUES ('transfer', $1)
            `,
            [JSON.stringify({ fromAccountId, toAccountId, amount, reference })],
        );
        await client.query("COMMIT");
        return { fromAccountId, toAccountId, amount, status: "success" };
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
