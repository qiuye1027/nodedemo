 var util = require('utils'),
EventEmitter = require('events').EventEmitter;
 


var Server = function() {
    console.log('init');
};
// inherits能够把 EventEmitter 类的方法添加到我们创建的 Server 类中,Server 的新实例都能够使用 EventEmitter 的方法

util.inherits(Server, EventEmitter);

//当需要使用 Server 类时，我们用 new Server() 来实例化它
var s = new Server();

//调用 on 方法来为这个实例添加监听器
s.on('abc', function(a,b,c) {
    console.log('abc'+a+b+c);
});

s.emit('abc','qa','qb','qc');


// process 模块是全局的，并且可以一直通过变量 process 获得   捕获异常
//最后一道防线  提供一个极其暴力的方法来捕获这些异常
process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});

 process.on('exit', function () {
    setTimeout(function () {
        console.log('This will not run');
    }, 100);
    console.log('Bye.');
});


// 顺序串行 I/O    所有与初始请求相关的回调 函数都被封装起来，并通过闭包内的变量共享状态
/*server.on('request', function(req, res) {
    var render = function(wsData) {
        page = pageRender(req, session, userData, wsData);
    };
    var getWsInfo = function(userData) {
        ws.get(req, render);
    };
    var getDbInfo = function(session) {
        db.get(session.user, getWsInfo);
    };
    var getMemCached = function(req, res) {
        memcached.getSession(req, getDbInfo);
    };
}*/





/*在函数间传递修改后的内容 当在函数间共享对象时，调用堆栈上靠前的函数会影响这些对象的状态，并传递给后续函数。
var AwesomeClass = function() {
    this.awesomeProp = 'awesome!'
    this.awesomeFunc = function(text) {
        console.log(text + ' is awesome!')
    }
}
var awesomeObject = new AwesomeClass()
function middleware(func) {
    oldFunc = func.awesomeFunc
    func.awesomeFunc = function(text) {
        text = text + ' really'
        oldFunc(text)
    }
}
function anotherMiddleware(func) {
    func.anotherProp = 'super duper'
}
function caller(input) {
    input.awesomeFunc(input.anotherProp)
}
middleware(awesomeObject)
anotherMiddleware(awesomeObject)
caller(awesomeObject)




通过 error 事件捕捉 I/O 错误
var http = require('http')
var opts = {
    host: 'dskjvnfskcsjsdkcds.net',
    port: 80,
    path: '/'
}
var req = http.get(opts, function(res) {
    console.log('This will never get called')
})
req.on('error', function(e) {
    console.log('Got that pesky error trapped')
})


*/

