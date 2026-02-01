const express = require("express");
const router = express.Router();
const pool = require("../db/pool");

router.get("/:id/reservations", async (req, res) => {
    const userId = req.params.id;
    if (userId === undefined) {
        return res.status(400).json({ error: "Invalid user id" });
    }
    try {
        const sql = await pool.query(
            `SELECT
                r.id AS reservation_id,
                r.status,
                r.created_at,
                r.screening_id
            FROM users u
            JOIN reservations r
                ON u.id = r.user_id
            WHERE u.id = $1
            ORDER BY r.created_at        
            `,
            [userId],
        );
        return res.json(sql.rows);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
