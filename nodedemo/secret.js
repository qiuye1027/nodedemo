var crypto = require('crypto');
var fs = require('fs');
/*常见的算法
d5 •
sha1 •
sha256 •
sha512 •
ripemd160
*/

/*var md5 = crypto.createHash('sha1');
  md5.update('foo');

console.log(md5.digest().toString())*/



//创建 Hmac 摘要
  

 //用同步的方式来读取密钥
 /* var pem = fs.readFileSync('data.txt');
  var key = pem.toString('ascii');
 
  var hmac = crypto.createHmac('sha1', key);

  console.log(hmac.digest('hex').toString())*/
  
  
  
  
  
  //公钥加密    
  //Cipher 把数据加密，  Decipher 解密数据， Sign 为数据创建加密签名， Verify 验证加密签名