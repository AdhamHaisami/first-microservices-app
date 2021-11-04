const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Welcome!', { socket: socket.id });

  socket.on('join_room', (id) => {
    socket.join(id);
    console.log(`User with ID: ${socket.id} joined room: ${id}`);
  });

  socket.on('send_message', (data) => {
    console.log(`data`, data);
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('GoodBye!', { socket: socket.id });
  });
});

server.listen(4040, () => {
  console.log('Server is listening');
});
