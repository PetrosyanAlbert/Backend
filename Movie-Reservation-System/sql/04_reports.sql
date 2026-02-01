-- ============================================
-- REPORT 1
-- Total price per reservation
-- (sum of all seat prices for each reservation)
-- ============================================

SELECT
    r.id AS reservation_id,
    SUM(rs.seat_price_amd) AS total_price_amd
FROM reservations r
JOIN reservation_seats rs
    ON r.id = rs.reservation_id
GROUP BY r.id
ORDER BY r.id;

-- ============================================
-- REPORT 2
-- Total revenue per movie
-- (sum of paid amounts grouped by movie)
-- ============================================

SELECT
    m.id AS movie_id,
    m.title AS movie_title,
    SUM(p.amount_amd) AS total_revenue_amd
FROM movies m
JOIN screenings sc
    ON m.id = sc.movie_id
JOIN reservations r
    ON sc.id = r.screening_id
JOIN payments p
    ON r.id = p.reservation_id
GROUP BY m.id, m.title
ORDER BY total_revenue_amd DESC;

-- ============================================
-- REPORT 3
-- Reservation count per user
-- (how many reservations each user has)
-- Includes users with zero reservations
-- ============================================

SELECT
    u.id AS user_id,
    u.full_name,
    COUNT(r.id) AS reservations_count
FROM users u
LEFT JOIN reservations r
    ON u.id = r.user_id
GROUP BY u.id, u.full_name
ORDER BY reservations_count DESC;

-- ============================================
-- REPORT 4
-- Most popular movies by seat count
-- (total number of reserved seats per movie)
-- ============================================

SELECT
    m.id AS movie_id,
    m.title AS movie_title,
    COUNT(rs.seat_id) AS seats_reserved
FROM movies m
JOIN screenings sc
    ON m.id = sc.movie_id
JOIN reservations r
    ON sc.id = r.screening_id
JOIN reservation_seats rs
    ON r.id = rs.reservation_id
GROUP BY m.id, m.title
ORDER BY seats_reserved DESC;


-- ============================================
-- REPORT 5
-- Unpaid reservations list (anti-join)
-- (reservations that do not have a payment)
-- ============================================

SELECT
    r.id AS reservation_id,
    r.status,
    r.created_at
FROM reservations r
LEFT JOIN payments p
    ON r.id = p.reservation_id
WHERE p.id IS NULL
ORDER BY r.id;
