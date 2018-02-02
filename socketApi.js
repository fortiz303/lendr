var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
});

// setTimeout(() => {
//   io.sockets.emit('SOCKET__TEST', {data: Math.random()})
// }, 1000)

socketApi.sendNotification = function() {
  io.sockets.emit('hello', {msg: 'Hello World!'});
};

socketApi.sendUpdates = (type, data) => {
  io.sockets.emit(type, data);
};

module.exports = socketApi;
