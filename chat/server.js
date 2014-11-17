var http = require("http"),
	fs = require("fs"),
	path = require("path"),
	mime = require("mime"),
	cache = {}; //用来缓存文件内容的对象


//发送文件数据及错误相应
var send404 = function(res){
	res.writeHead(404,{'content-type':'text/plain'});
	res.end('404,你的页面被吃了');
}


//提供文件数据服务
var sendFile = function(res,filePath,fileContents){
	res.writeHead(200,{'content-type':mime.lookup(path.basename(filePath))});
	res.end(fileContents);
}	


//提供静态文件服务
var serverStatic = function(res,cache,absPath){
	if(cache[absPath]){			//检查文件是缓存在内存中
		sendFile(res,absPath,cache[absPath]);
	}else{
		fs.exists(absPath,function(exists){
			if(exists){
				fs.readFile(absPath,function(err,data){		//从硬盘中读取文件
					if(err){
						send404(res);
					}else{
						cache[absPath] = data;
						sendFile(res,absPath,data);		//返回
					}
				})
			}else{
				send404(res);
			}
		})
	}
}



//创建HTTP服务器
var server = http.createServer(function(req,res){
	var filePath = false ;

	if(req.url == '/'){
		filePath = 'public/index.html';
	}else{
		filePath = 'public' + req.url;
	}

	var absPath = './' + filePath;
	serverStatic(res,cache,absPath);		// 返回静态文件
});

server.listen(3000,function(){
	console.log("server listening on port 3000.");
})