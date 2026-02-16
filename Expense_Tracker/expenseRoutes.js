const express = require('express');
const { authMiddleware } = require('./middleware');
const router = express.Router();

module.exports = (db) => {
    router.get('/', authMiddleware, async (req, res) => {
        const expenses = await db.all('SELECT * FROM expenses WHERE user_id = ?', [req.user.id]);
        res.json(expenses);
    });
    router.post('/', authMiddleware, async (req, res) => {
        const { amount, category } = req.body;
        await db.run('INSERT INTO expenses (amount, category, user_id) VALUES (?, ?, ?)', 
            [amount, category, req.user.id]);
        res.status(201).json({ message: "ხარჯი დაემატა" });
    });

    return router;
};