var formidable = require('formidable'),  
    express = require('express'),
    routes = require('./routes/file.js'),
    http = require('http'),  
    fs = require('fs'),  
    sys = require('sys'),
    ejs = require('ejs'),
    path = require('path'), 
    msg = ""; 

 
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
 
app.get('/', routes.flieupload);
app.post('/upload', routes.doupload);


// 启动及端口
http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});



  
/*http.createServer(function(req, res) {  
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {  
        // parse a file upload  
        var form = new formidable.IncomingForm();  
        //文件上传 临时文件存放路径 
        form.uploadDir = '/qiuye';

        //这里formidable会对upload的对象进行解析和处理  
        form.parse(req, function(err, fields, files) {  
            res.writeHead(200, {'content-type': 'text/plain'});  
            res.write('received upload:\n\n');  
            res.write(sys.inspect({fields: fields, files: files})); 
 


            //限制文件上传大小Max: 300k'
             if(files.upload.size >307200)// 300 * 1024
            {
                msg +='File size no accepted. Max: 300k';
                console.log(msg);
                return ;
            }

            //文件上传到临时文件目录下，我们还要将临时文件， 移到我们的上传目录中
            fs.rename(files.upload.path, form.uploadDir + '/' + files.upload.name);

             fs.readFile(form.uploadDir + '/' + files.upload.name,'binary',function(err, file) {
                    if (err) {
                        console.log(err);
                        return;
                    }else{
                        res.writeHead(200, {'Content-Type': 'image/jpeg'});
                        res.end(file,'binary');
                    }
                }); 




        }); 

        //如何显示上传进度
        form.on('progress',function(bytesReceived, bytesExpected){
                 console.log(((bytesReceived / bytesExpected)*100)+"% uploaded");
             }); 
        return;  
    }  
  

            
 
 
    // show a file upload form  
    res.writeHead(200, {'content-type': 'text/html'});  
    res.end(  
        '<form action="/upload" enctype="multipart/form-data" '+  
            'method="post">'+  
            '<input type="text" name="title"><br>'+  
            '<input type="file" name="upload" multiple="multiple"><br>'+  
            '<input type="submit" value="Upload">'+  
            '</form>'  

    );  
}).listen(3000);  */