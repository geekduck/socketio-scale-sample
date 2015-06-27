var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379}));

var port = 8080 + parseInt(process.env.NODE_APP_INSTANCE || 0);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', "port:" + port + " user:" + socket.id + " msg:" + msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
