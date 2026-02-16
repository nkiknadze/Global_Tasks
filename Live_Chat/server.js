const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Colneection...');

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined: ${room}`);
        
        socket.emit('message', { user: 'Admin', text: `Hi: ${room}` });
        
        socket.broadcast.to(room).emit('message', { user: 'Admin', text: `${username} join.` });
    });
    socket.on('chatMessage', ({ username, room, message }) => {
        io.to(room).emit('message', { user: username, text: message });
    });

    socket.on('disconnect', () => {
        console.log('user left chat');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`chat start http://localhost:${PORT}`));