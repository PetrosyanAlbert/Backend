const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/", async (_, res) => {
    try {
        const sql = await pool.query(
            "SELECT id, title, duration_min, age_rating, release_year FROM movies ORDER BY id",
        );
        return res.json(sql.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get("/:id/screenings", async (req, res) => {
    const movieId = req.params.id;
    if (movieId === undefined) {
        return res.status(400).json({ error: "Invalid movie id" });
    }
    try {
        const sql = await pool.query(
            `SELECT
                sc.id,
                sc.starts_at,
                sc.base_price_amd,
                sc.hall_id
            FROM screenings sc
            JOIN movies m
                ON sc.movie_id = m.id
            WHERE m.id = $1
            ORDER BY sc.starts_at        
            `,
            [movieId],
        );
        return res.json(sql.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
