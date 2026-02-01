const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/movies-revenue", async (_, res) => {
    try {
        const sql = await pool.query(
            `SELECT
                m.id AS movie_id,
                m.title AS movie_title,
                SUM(p.amount_amd) AS total_amount
                FROM movies m
                JOIN screenings sc
                ON m.id = sc.movie_id
                JOIN reservations r
                ON sc.id = r.screening_id
                JOIN payments p
                ON r.id = p.reservation_id
                GROUP BY m.id, m.title
                ORDER BY total_amount DESC
            `,
        );
        return res.json(sql.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;