DROP TABLE IF EXISTS transfers;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    balance_amd BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (balance_amd >= 0),
    CHECK (status IN ('active', 'frozen'))
);

CREATE TABLE transfers (
    id BIGSERIAL PRIMARY KEY,
    from_account_id BIGINT NOT NULL REFERENCES accounts(id),
    to_account_id   BIGINT NOT NULL REFERENCES accounts(id),
    amount_amd BIGINT NOT NULL,
    note TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CHECK (amount_amd > 0),
    CHECK (from_account_id <> to_account_id)
);