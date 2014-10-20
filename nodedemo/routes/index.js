exports.index = function(req, res){
    res.render('client', { title: 'Index' });
};

exports.login = function(req, res){
    res.render('login', { title: '用户登陆',message: '欢迎光临'});     //login 为view对应页面login.html
};

exports.doLogin = function(req, res){

    var user={
        username:'admin',
        password:'admin'
    }
     
    if(req.body.username===user.username && req.body.password===user.password){
        res.redirect('/home?'+req.body.username);
    }
        res.render('login', { title: '用户登陆',message: '用户名或密码错误，请重新输入'});
 };
    
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