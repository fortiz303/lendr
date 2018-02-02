var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
    console.log('A user connected');

    socketApi.sendUpdates = (type, data) => {
      io.sockets.emit(type, data);
    };
});

module.exports = socketApi;
