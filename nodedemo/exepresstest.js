 
  var express = require("express");
  var app = express();
  app.get('/t*', function(req, res) {
      next()
    //res.send('hello world');
});  


//使用冒号（:）来标记想要使用的变量，那么在 URL 中传递的字符串就会被捕获并保存在该变量中
app.get('/:id*', function(req, res) {
    if(req.params.id) {
        res.send("router is :"+req.params.id);
    } else {
     
        res.send('oh hai');
    }
});


app.listen(9001);
console.log("server run at port 9001")