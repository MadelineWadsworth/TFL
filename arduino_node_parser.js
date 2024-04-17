
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static('public'));  // Serve files from the 'public' directory

// Your SerialPort setup remains the same
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
let portName = '/dev/tty.usbmodem14202';
let myPort = new SerialPort({ path: portName, baudRate: 9600 });
const parser = myPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('data', function(data) {
  console.log(data);
  io.emit('data', data);  // Emitting data to all connected clients
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = 8081;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
