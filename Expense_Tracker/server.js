require('dotenv').config();
const express = require('express');
const initDB = require('./db');
const authRoutes = require('./authRoutes');
const expenseRoutes = require('./expenseRoutes');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const start = async () => {
    const db = await initDB();

    app.use('/auth', authRoutes(db));
    app.use('/expenses', expenseRoutes(db));

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
};

start();