 
  var express = require("express");
  var app = express();

  app.use(express.limit('1mb'));
  app.use(express.bodyParser());        // 解 析 从 Web 浏览器发送来的请求正文，并把表单变量转换成 Express 使用的对象
  app.use(express.methodOverride());    //允许表单提交隐藏的 _method 变量，并把 GET 方法替换 掉，然后调用相应的 RESTful 方法类型


  app.get('/t*', function(req, res) {
        res.send('<form method="post" action="/">' +
                '<input type="hidden" name="_method" value="put" />' +
                'Your Name: <input type="text" name="username" />' +
                '<input type="submit" />' +
                '</form>');
});  


//使用冒号（:）来标记想要使用的变量，那么在 URL 中传递的字符串就会被捕获并保存在该变量中
/*app.get('/:id*', function(req, res) {
    if(req.params.id) {
        res.send("router is :"+req.params.id);
    } else {
     
        res.send('oh hai');
    }
});*/
 app.get('/books/:id.:format((json|xml))', function(req, res) {
res.send(req.params.id + "<br/>" + req.params.format);
// 会响应 :
// /books/7.json
// /books/7.xml
// 但不会处理 :
// /books/7
// /books/7.txt
});
 

app.get('/a*', function(req,res) {
res.send('a');
// 匹配 /afoo /a.bar /a/qux 等
});
app.get('/b*/c*d', function(req,res) {
res.send('b');
// 匹配 /b/cd /b/cfood /b//c/d/ 等
// 不匹配 /b/c/d/foo
});
 
app.put('/', function(req, res) {
res.send('Welcome, ' + req.body.username);
});


app.listen(9001);
console.log("server run at port 9001")