CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT students_status_check
        CHECK (status IN ('active', 'paused', 'dropped'))
);
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    price_amd INTEGER NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT courses_level_check 
        CHECK (level IN ('begginer', 'intermediate', 'advanced')),
    CONSTRAINT courses_price_check
        CHECK (price_amd >= 0)
);
CREATE TABLE support_tickets (
    id SERIAL PRIMARY KEY,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'medium',
    state TEXT NOT NULL DEFAULT 'open',
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT tickets_priority_check
        CHECK (priority IN ('low', 'medium', 'high')),
    CONSTRAINT tickets_state_check
        CHECK (state IN ('open', 'in_progress', 'resolved', 'closed'))
);
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price_amd INTEGER NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT inventory_quantity_check
        CHECK (quantity >= 0),
    CONSTRAINT inventory_price_check
        CHECK (unit_price_amd >= 0)
);