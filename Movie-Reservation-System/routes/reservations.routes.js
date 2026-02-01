const expres = require("express");
const router = expres.Router();
const pool = require("../db/pool");

router.get("/unpaid", async (_, res) => {
    try {
        const sql = await pool.query(
            `SELECT
            r.id AS reservation_id,
            r.user_id,
            r.status,
            r.created_at
            FROM reservations r
            LEFT JOIN payments p
            ON r.id = p.reservation_id
            WHERE p.id IS NULL
            ORDER BY
            r.created_at
            `,
        );
        return res.json(sql.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const resId = req.params.id;
    if (resId === undefined) {
        return res.status(400).json({ error: "Invalid reservation id" });
    }
    try {
        const sql = await pool.query(
            `SELECT
            u.full_name AS user_name,
            h.name AS hall_name,
            s.row_label,
            s.seat_number,
            sc.starts_at AS movie_starts_at
            FROM users u
            JOIN reservations r
            ON u.id = r.user_id
            JOIN screenings sc
            ON r.screening_id = sc.id
            JOIN halls h
            ON sc.hall_id = h.id
            JOIN reservation_seats rs
                ON r.id = rs.reservation_id
            JOIN seats s
                ON rs.seat_id = s.id
            WHERE r.id = $1
            ORDER BY
                s.row_label,
                s.seat_number
        `,
            [resId],
        );
        return res.json(sql.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
