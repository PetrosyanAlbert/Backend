// Tables: payments, users, reservation_seats, reservations, screenings, seats, halls, movies

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS payments CASCADE;
DROP TABLE IF EXISTS reservation_seats CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS screenings CASCADE;
DROP TABLE IF EXISTS seats CASCADE;
DROP TABLE IF EXISTS halls CASCADE;
DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE movies (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    duration_min INT NOT NULL,
    age_rating TEXT,
    release_year INT,
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CHECK(duration_min > 0)
);

CREATE TABLE halls (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    capacity INT NOT NULL,

    CHECK (capacity > 0)
);

CREATE TABLE seats (
    id BIGSERIAL PRIMARY KEY,
    hall_id BIGINT NOT NULL REFERENCES halls(id),
    row_label TEXT NOT NULL,
    seat_number INT NOT NULL,

    CHECK (seat_number > 0)
);

CREATE TABLE screenings (
    id BIGSERIAL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id),
    hall_id BIGINT NOT NULL REFERENCES halls(id),
    starts_at TIMESTAMP NOT NULL,
    base_price_amd INT NOT NULL,
    
    CHECK (base_price_amd > 0)
);

CREATE TABLE reservations (
    id BIGSERIAL PRIMARY KEY,
    screening_id BIGINT NOT NULL REFERENCES screenings(id),
    user_id BIGINT REFERENCES users(id),
    status TEXT NOT NULL DEFAULT 'created',
    created_at TIMESTAMP NOT NULL DEFAULT now(),

    CHECK (status IN ('created', 'confirmed', 'canceled'))
);

CREATE TABLE reservation_seats (
    reservation_id BIGINT NOT NULL REFERENCES reservations(id),
    seat_id BIGINT NOT NULL REFERENCES seats(id),
    seat_price_amd INT NOT NULL,
    PRIMARY KEY (reservation_id, seat_id),

    CHECK (seat_price_amd > 0)
);

CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    reservation_id BIGINT NOT NULL UNIQUE REFERENCES reservations(id),
    amount_amd INT NOT NULL,
    method TEXT NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT now(),

    CHECK (amount_amd > 0),
    CHECK (method IN ('card', 'cash', 'online'))
);

CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_screening_id ON reservations(screening_id);
CREATE INDEX idx_screenings_movie_id ON screenings(movie_id);
CREATE INDEX idx_seats_hall_id ON seats(hall_id);
CREATE INDEX idx_reservation_seats_seat_id ON reservation_seats(seat_id);

