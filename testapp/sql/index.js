//http://qqqiuye.kd.io/phpmyadmin     root    root
var mysql = require( 'mysql' );
var sys = require('util');
var connectParams = {
    'hostname': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'test'
}
var db = mysql.createConnection(connectParams);
var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
var selectSQL = 'select * from user where name= ? and ps = ?';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update"  where name="conan"';


 //选择哪个库 并进行连接
ClientConnectionReady = function(client){
    console.log('ClientConnectionReady');
    client.query('USE test',function(error,results){
        if(error){
            console.log('ClientConnectionReady Error:'+error.message);
            client.end();
            return;
        } 
          
    });
}
 
 //遍历所有数据
GetData = function(client,ps,names,callback){

   client.query(
        'select * from user where name= "'+names+'" and ps = "'+ps+'"' ,
        function selectZ(error,results,fields){
            if(error){
                console.log('GetData Error'+error.message);
                client.end();
                return;
            }else {
               callback(res)= results;
            } 

            
/*
            console.log('Results:'+names);
            console.log(results[0].name);
            console.log('Field metadata:');
            console.log('fields');
            console.log(sys.inspect(results));
            //查看第一条数据
            if(results.length>0){
                var firstResult = results[0];
                console.log('id:'+firstResult['id']);
                console.log('name:'+firstResult['name']);
                console.log('ps:'+firstResult['ps']);
            }*/
        }
    ) 
   client.end();
    console.log('connection closed.');
}



//插入数据
datainsert = function(client){
    var values=['lazynight','hello qiuye'];
    client.query('insert into users set user_login=?,user_nicename=?',values,function(error,results){
        if(error){
            console.log('ClientReady Error:'+error.message);
            client.end();
            return;
        }
        console.log('Inserted:'+results.affectedRows+'row.');
        console.log('Id inserted:'+results.insertId);
        console.log(results)
    });
    //GetData(client);
}





exports.find = function(ps,names){
    
     ClientConnectionReady(db);
     GetData(db,ps,names,function(res){
        console.log(res)
     }) ;

}

 