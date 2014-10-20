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



 //选择哪个库 并进行连接
ClientConnectionReady = function(client){
    console.log('ClientConnectionReady');
    client.query('USE test',function(error,results){
        if(error){
            console.log('ClientConnectionReady Error:'+error.message);
            client.end();
            return;
        } 
          GetData(client,2);
    });
}
 
 //遍历所有数据
GetData = function(client,id){
    client.query(
        'select * from user where id='+id,
        function selectZ(error,results,fields){
            if(error){
                console.log('GetData Error'+error.message);
                client.end();
                return;
            }
            console.log('Results:');
            console.log(results);
            console.log('Field metadata:');
            console.log('fields');
            console.log(sys.inspect(results));
            //查看第一条数据
            if(results.length>0){
                var firstResult = results[0];
                console.log('id:'+firstResult['id']);
                console.log('user_login:'+firstResult['user_login']);
                console.log('user_nicename:'+firstResult['user_nicename']);
            }
        }
    );
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


ClientConnectionReady(db);

 