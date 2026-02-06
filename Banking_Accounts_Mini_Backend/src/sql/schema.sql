CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS accounts (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id),
    currency TEXT NOT NULL,
    balance BIGINT NOT NULL DEFAULT 0,
    status TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (currency IN ('AMD', 'USD', 'EUR')),
    CHECK (balance >= 0),
    CHECK (status IN ('active','frozen','closed'))
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    from_account_id INT REFERENCES accounts(id),
    to_account_id INT REFERENCES accounts(id),
    amount BIGINT NOT NULL,
    reference TEXT NOT NULL UNIQUE,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (type IN ('deposit','withdraw','transfer')),
    CHECK (amount > 0),

    CHECK (
        type <> 'deposit'
        OR (to_account_id IS NOT NULL AND from_account_id IS NULL)
    ),

    CHECK (
        type <> 'withdraw'
        OR (from_account_id IS NOT NULL AND to_account_id IS NULL)
    ),

    CHECK (
        type <> 'transfer'
        OR (
            from_account_id IS NOT NULL
            AND to_account_id IS NOT NULL
            AND from_account_id <> to_account_id
        )
    )
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    action TEXT NOT NULL,
    meta JSONB NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
