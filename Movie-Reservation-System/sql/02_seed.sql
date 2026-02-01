BEGIN;

TRUNCATE TABLE payments RESTART IDENTITY CASCADE;
TRUNCATE TABLE reservation_seats RESTART IDENTITY CASCADE;
TRUNCATE TABLE reservations RESTART IDENTITY CASCADE;
TRUNCATE TABLE screenings RESTART IDENTITY CASCADE;
TRUNCATE TABLE seats RESTART IDENTITY CASCADE;
TRUNCATE TABLE halls RESTART IDENTITY CASCADE;
TRUNCATE TABLE movies RESTART IDENTITY CASCADE;
TRUNCATE TABLE users RESTART IDENTITY CASCADE;


INSERT INTO users (full_name, email) VALUES
('Arman Petrosyan', 'arman@mail.com'),
('Lilit Grigoryan', 'lilit@mail.com'),
('Gor Sargsyan', 'gor@mail.com'),
('Ani Hakobyan', 'ani@mail.com'),
('Bob Smith', 'bob@example.com'),
('Karen Vardanyan', 'karen@mail.com');

INSERT INTO movies (title, duration_min, age_rating, release_year) VALUES
('Inception', 148, 'PG-13', 2010),
('Interstellar', 169, 'PG-13', 2014),
('The Matrix', 136, 'R', 1999),
('Avatar', 162, 'PG-13', 2009);

INSERT INTO halls (name, capacity) VALUES
('Hall A', 120),
('Hall B', 80);


INSERT INTO seats (hall_id, row_label, seat_number) VALUES
(1, 'A', 1),
(1, 'A', 2),
(1, 'A', 3),
(1, 'B', 1),
(1, 'B', 2),
(1, 'B', 3);

INSERT INTO seats (hall_id, row_label, seat_number) VALUES
(2, 'A', 1),
(2, 'A', 2),
(2, 'A', 3),
(2, 'B', 1),
(2, 'B', 2),
(2, 'B', 3);

INSERT INTO screenings (movie_id, hall_id, starts_at, base_price_amd) VALUES
(1, 1, '2026-02-01 18:00:00', 2000),

(1, 2, '2026-02-01 21:00:00', 2200),

(2, 1, '2026-02-02 19:00:00', 2500),

(3, 2, '2026-02-03 20:00:00', 2300),

(4, 1, '2026-02-04 18:30:00', 2400),

(4, 2, '2026-02-04 21:30:00', 2600);


INSERT INTO reservations (screening_id, user_id, status) VALUES
(1, 1, 'confirmed'),
(2, 2, 'confirmed'),
(3, 3, 'created'),
(4, 4, 'created'),
(5, 6, 'confirmed'),
(5, null, 'confirmed'),
(6, 4, 'confirmed');


INSERT INTO reservation_seats (reservation_id, seat_id, seat_price_amd) VALUES
(1, 1, 2000),
(1, 2, 2000),
(2, 1, 2200),
(2, 3, 2200),
(3, 1, 2500),
(3, 4, 2500),
(4, 5, 2300),
(4, 6, 2300),
(5, 7, 2400),
(5, 8, 2400);


INSERT INTO payments (reservation_id, amount_amd, method) VALUES
(1, 4000, 'card'),
(2, 4400, 'online'),
(4, 4600, 'cash');

COMMIT;
