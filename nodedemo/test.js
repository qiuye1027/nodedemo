var http = require('http'),
io = require('socket.io');
server = http.createServer();
server.on('request', function(req, res){
// 常见的 HTTP 服务器内容
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello World');
});
server.listen(80);
 
var socket = io.listen(server);
socket.on('connection', function(client){
console.log('Client connected');
});