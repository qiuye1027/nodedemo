var fs = require('fs');
var dns = require('dns');
var filehandle = fs.readFile('data.txt', function(err, data) {
    //console.log(data.toString())
});

 dns.resolve4('www.google.com', function(e, r) {
    if (e) {
        console.log(e);
    }
    //console.log("r+++"+r);
});
 


 dns.lookup('google.com', 4, function(e, a) {
//console.log(a);
}); 


//使用 vm 和 eval() 在访问本地作用域时的区别  eval(e=e+1);
var vm = require('vm'),
  e = 0,
  v = 0;
  vm.runInThisContext('v=0');
  console.log(vm.runInThisContext( 'v=v+1' ) );
  
 console.log(v );