/**
* 模块依赖
*/
var express = require('express')
, routes = require('./routes')
 
, http = require('http')
, ejs = require('ejs')
, path = require('path');

var app = express();

//环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);
app.get('/home', routes.home);

// 开发模式
if ('development' == app.get('env')) {
app.use(express.errorHandler());
}

// 路径解析
app.get('/', routes.index);
 

// 启动及端口
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});