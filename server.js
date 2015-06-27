var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var redis = require('socket.io/lib/stores/redis');
var redisConf = {
  host: '127.0.0.1',
  port: 6379
};
io.set('store', new redis({
  redisPub: redisConf,
  redisSub: redisConf,
  redisClient: redisConf
}));

var port = 8080 + parseInt(process.env.NODE_APP_INSTANCE || 0);;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.sockets.emit('chat message', "port:" + port + " user:" + socket.id + " msg:" + msg);
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
