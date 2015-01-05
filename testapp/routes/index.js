var sign = require('../proxy');

exports.index = function(req, res){
    res.render('client', { title: 'Index' });
};

exports.login = function(req, res){

    //延时启动
  function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }

  sleep(10000);
    res.render('login', { title: '用户登陆',message: '欢迎光临'});     //login 为view对应页面login.html
};

exports.doLogin = function(req,res){

     sign.getUsersByNames(req.body.password,req.body.username,function(rest){
         
        if(rest){
            
             res.render('home', { title: 'Home',user: rest[0].name});
        }else{
            res.render('login', { title: '用户登陆',message: '欢迎光临'});
        }
     });
 
  }
        
    
exports.logout = function(req, res){
    res.redirect('/');
};

exports.home = function(req, res){
  
    var user={
        username:req._parsedUrl.query,
        password:'admin'
    }
    res.render('home', { title: 'Home',user: user});
};


exports.chatsocket = function(req, res){
    res.render('chatsocket', { title: 'Index' });
};


