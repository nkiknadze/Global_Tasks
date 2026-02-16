import express from 'express';
import { users, posts } from './data.js';

const app = express();
const PORT = 3001;
const paginate = (array, page, limit) => {
    if (!page || !limit) return array;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return array.slice(startIndex, endIndex);
};

app.get('/', (req, res) => res.send("Task Server"));

app.get('/users', (req, res) => {
    let result = [...users];
    const { id, name, page, limit } = req.query;

    if (id) result = result.filter(u => u.id === parseInt(id));
    if (name) result = result.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    const paginatedResult = paginate(result, page ? parseInt(page) : null, limit ? parseInt(limit) : null);
    res.json(paginatedResult);
});
app.get('/posts', (req, res) => {
    let result = [...posts];
    const { id, page, limit } = req.query;

    if (id) result = result.filter(p => p.id === parseInt(id));

    const paginatedResult = paginate(result, page ? parseInt(page) : null, limit ? parseInt(limit) : null);
    res.json(paginatedResult);
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));