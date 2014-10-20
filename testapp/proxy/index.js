 
var sql = require('../sql');

/**
 * 根据用户名列表查找用户列表
 * Callback:
 * - err, 数据库异常
 * - users, 用户列表
 * @param {Array} names 用户名列表
 * @param {Function} callback 回调函数
 */
exports.getUsersByNames = function (ps,names) {
 
   sql.find(ps,names,function(re){
   		console.log(re);
   });
};

 
