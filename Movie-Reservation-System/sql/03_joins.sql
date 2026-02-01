-- 1. INNER JOIN
-- Reservations that belong to registered users only
-- (only reservations that have a valid user relationship)

SELECT u.id, u.full_name
FROM users AS u
JOIN reservations r
ON u.id = r.user_id;

-- 2. LEFT JOIN
-- All users, including those who have no reservations
-- (users are the main entity, reservations are optional)

SELECT 
u.id AS user_id,
u.full_name,
r.id AS reservation_id
FROM users u
LEFT JOIN reservations r 
ON u.id = r.user_id;

-- 3. RIGHT JOIN (implemented via LEFT JOIN)
-- All reservations, including guest reservations
-- (reservations are the main entity, users are optional)

SELECT 
r.id AS reservation_id,
r.user_id,
u.full_name
FROM reservations r
LEFT JOIN users u
ON u.id = r.user_id;

-- 4. FULL OUTER JOIN
-- All users and all reservations together
-- (includes users without reservations and guest reservations)

SELECT 
u.id AS user_id,
u.full_name,
r.id AS reservation_id,
r.user_id 
FROM users u
FULL OUTER JOIN reservations r
ON u.id = r.user_id;


-- 5. Many-to-Many JOIN
-- Reservation → junction table → seats
-- (N:M relationship between reservations and seats via reservation_seats)

SELECT 
r.id AS reservation_id,
s.id AS seat_id,
s.row_label,
s.seat_number,
rs.seat_price_amd
FROM reservations r
JOIN reservation_seats rs 
ON r.id = rs.reservation_id
JOIN seats s 
ON s.id = rs.seat_id
ORDER BY r.id, s.id;


-- 6. One-to-One JOIN
-- Reservation with payment
-- (shows only paid reservations)

SELECT
r.id AS reservation_id,
p.amount_amd,
p.method,
p.paid_at
FROM reservations r
JOIN payments p
ON r.id = p.reservation_id;


-- 7. Movie-based JOIN
-- Movies → screenings → reservations
-- (shows which reservations belong to which movies through screenings)

SELECT
m.id AS movie_id,
m.title,
sc.id AS screening_id,
r.id AS reservation_id,
r.user_id
FROM movies m
JOIN screenings sc
ON m.id = sc.movie_id
JOIN reservations r
ON sc.id = r.screening_id
ORDER BY m.id, sc.id, r.id;
