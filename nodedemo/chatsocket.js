 /**
* 模块依赖
*/
var express = require('express')
, routes = require('./routes')
, http = require('http')
, ejs = require('ejs')
, path = require('path')
, io = require('socket.io') 
, fs = require('fs')
, clientList = [];


//readFileSync() 在程序周期中只执行一次， 同步的方法
 var sockFile = fs.readFileSync('chatsocket.html'); 

// Socket 服务器还是构建于 HTTP 服务器之上，因此先调用 http.createServer()  
server = http.createServer();

server.on('request', function(req, res){  
  // 一般 HTTP 输出的格式  
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(sockFile);    
});  

server.listen(3001); 
  console.log('Client  3001');  

var socket = io.listen(server); // 交由 Socket.io 接管  
// Socket.io 真正的连接事件  
socket.on('connection', function(client){  
  
   client.name = client.username ;
  client.send('<h1>chat web app start</h1>' ); // 向客户端发送文本  
   clientList.push(client);
  
    client.on('data', function(data) {
     broadcast(data, client)
    });
    client.on('end', function(data) { console.log(client.name + ' quit');
        for(var i=0;i<clientList.length;i++){
            if(client !== clientList[i]) {
                clientList[i].send(data.name +'  has quit ' )
            }
        }
        clientList.splice(clientList.indexOf(client), 1);
    })
    client.on('error', function(e) {
        console.log(e);
    })
   
    client.on('add user', function(data) {
        for(var i=0;i<clientList.length;i++){
            if(client == clientList[i]){
                clientList[i].send('<p class="mine"><span>'+data.name +'</span><span class="chatcent">' + data.cent+'</span></p>')
            }else if(client !== clientList[i]) {
                clientList[i].send('<p class="yours"><span>'+data.name +'</span><span class="chatcent">' + data.cent+'</span></p>')
                 
            }
        }
     
    });
  
  
  
});  

 function broadcast(message, client) {
    var cleanup = [];
    for(var i=0;i<clientList.length;i+=1) {
        if(client !== clientList[i]) {
            if(clientList[i].writable) {
                clientList[i].send(client.name + " says " + message)
            } else {
                cleanup.push(clientList[i])
                clientList[i].destroy()
            }
        }
    }
    // 在写入循环中删除死节点，消除垃圾索引
     
    for(i=0;i<cleanup.length;i+=1) {
        clientList.splice(clientList.indexOf(cleanup[i]), 1)
    }
}



