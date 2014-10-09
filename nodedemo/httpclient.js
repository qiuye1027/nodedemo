var http = require('http');
var URL = require('url');//解析和处理 URL 字符串的便利工具
var qs = require('querystring');
var options = {
host: 'www.example.com',
port: 80,
path: '/submit',
method: 'POST'
};
var req = http.request(options, function(res) {
res.setEncoding('utf8');
res.on('data', function (chunk) {
//console.log('BODY: ' + chunk);
});
});
req.write("my data");
req.write("more of my data");


/*href  原 始 输 入 用 来 解 析 的 完 整 URL
protocol  用 在 URL 里 的 协 议
host 是 URL 里 完 整 的 hostname
auth 包含用户证书
hostname 包含 URL 的主机名
port 单纯是端口
pathname  pathname 是跟在 host 之后的整个文件路径
search 保存了 URL 中 HTTP GET 的参数
query •
hash  URL 中在 # 之后的部分 */
var myUrl = "http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash";
var parsedUrl = URL.parse(myUrl);
//console.log(parsedUrl)
var jsondata = qs.parse('a=1&b=2&c=d')
//console.log(jsondata.a)


// encode  函数把输入的 key-value 格式的对象转换成 query 字符串的格式
var myObj = {
    'a':1, 
    'b':5, 
    'c':'cats', 
    'func': function(){
                console.log('dogs')  
            }
    
}
var query = qs.encode(myObj)
console.log(query)
req.end();