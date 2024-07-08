// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Chat server is running');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg+ socket.id);

    // Broadcast the message to all connected users
    // io.emit('chat message', msg, "from ", socket.id );
    console.log(socket)
    io.emit(`chat message ${msg} from  ${socket.id}`);
  });

  // Listen for disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
