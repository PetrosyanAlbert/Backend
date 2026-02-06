const pool = require("../db/pool");
const ConflictError = require("../errors/ConflictError");
const NotFoundError = require("../errors/NotFoundError");

module.exports.createCustomer = async ({ full_name, email, phone }) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const customerResult = await client.query(
            `
            INSERT INTO customers (full_name, email, phone)
            VALUES ($1, $2, $3)
            RETURNING id
            `,
            [full_name, email, phone || null],
        );
        const customer = customerResult.rows[0];

        const accountResult = await client.query(
            `
            INSERT INTO accounts (customer_id, currency, balance, status)
            VALUES ($1, $2, 0, 'active')
            RETURNING id, currency, balance, status
            `,
            [customer.id, "AMD"],
        );
        const account = accountResult.rows[0];
        await client.query("COMMIT");
        return { ...customer, accounts: [account] };
    } catch (err) {
        await client.query("ROLLBACK");

        if (err.code === "23505") {
            throw new ConflictError("Email already exists");
        }

        throw err;
    } finally {
        client.release();
    }
};

module.exports.getCustomerById = async (id) => {
    try {
        const { rows } = await pool.query(
            `
            SELECT
            c.id AS customer_id,
            c.full_name,
            c.email,
            c.phone,
            a.id AS account_id,
            a.currency,
            a.balance,
            a.status
            FROM customers c
            LEFT JOIN accounts a
            ON a.customer_id = c.id
            WHERE c.id = $1
            `,
            [id],
        );
        if (rows.length === 0) {
            throw new NotFoundError("Customer not found");
        }
        return rows[0];
    } catch (err) {
        throw err;
    }
};
