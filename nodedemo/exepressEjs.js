 
  var express = require("express");
  var app = express()
  , routes = require('./routes')
   
  , path     = require('path') ;
 
app.configure(function(){
  app.set('views', path.join(__dirname, 'views'));
  //app.set('view engine', 'ejs');
  app.set('view engine', 'html');
  app.engine('.html', require('ejs').__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(app.router);
});

app.get('/', routes.login);
app.get('/login.html', routes.login);
app.get('/home', routes.home); 
 

app.post("/login", routes.doLogin);

app.listen(9001);
console.log("server run at port 9001  ejs")