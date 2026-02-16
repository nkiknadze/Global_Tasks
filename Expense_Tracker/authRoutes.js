const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware'); 
const router = express.Router();

module.exports = (db) => {
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
            res.status(201).json({ message: "მომხმარებელი დარეგისტრირდა" });
        } catch (err) {
            res.status(400).json({ message: "მომხმარებელი უკვე არსებობს" });
        }
    });

    router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { id: user.id, name: user.username }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '1h' }
                );
                res.json({ token });
            } else {
                res.status(400).json({ message: "არასწორი მონაცემები" });
            }
        } catch (err) {
            res.status(500).json({ message: "სერვერის შეცდომა" });
        }
    });

    return router;
};