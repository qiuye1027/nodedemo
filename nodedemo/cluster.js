//进程管理

//使用集群来分发任务
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;
//master是总控节点
if (cluster.isMaster) {
    console.log('[master] ' + "start master...");

    for (var i = 0; i < numCPUs; i++) {
        // 创建工作进程
        var wk = cluster.fork();
        wk.send('[master] ' + 'hi worker' + wk.id);
    }

    cluster.on('fork', function (worker) {
        console.log('[master] ' + 'fork: worker' + worker.id);
    });

    cluster.on('online', function (worker) {
        console.log('[master] ' + 'online: worker' + worker.id);
    });
//worker是运行节点
    cluster.on('listening', function (worker, address) {
        console.log('[master] ' + 'listening: worker' + worker.id + ',pid:' + worker.process.pid + ', Address:' + address.address + ":" + address.port);
    });

    cluster.on('disconnect', function (worker) {
        console.log('[master] ' + 'disconnect: worker' + worker.id);
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('[master] ' + 'exit worker' + worker.id + ' died');
    });

    function eachWorker(callback) {
        for (var id in cluster.workers) {
            callback(cluster.workers[id]);
        }
    }

    setTimeout(function () {
        eachWorker(function (worker) {
            worker.send('[master] ' + 'send message to worker' + worker.id);
             
        });
    }, 3000);
    
    
 /*   大约每隔一秒，主进程
    就会检查所有的工作进程，看看是否有某个进程已经超过 5 秒未更新状态（因为超
    时是以微秒为单位，所以我们用的是 >5000 ） 。如果发现这样的进程，主进程将把阻
    编写健壮的 Node 程序 ｜ 51
    塞的工作进程杀掉并重启。
    */
    
     setInterval(function() {
        var time = new Date().getTime()
        for(pid in workers) {
            if(workers.hasOwnProperty(pid) &&
            workers[pid].lastCb + 5000 < time) {
                console.log('Long running worker ' + pid + ' killed')
                workers[pid].worker.kill()
                delete workers[pid]
                createWorker()
            }
        }
    }, 1000)
//cluster.workers与cluster.isMaster之间通信

    Object.keys(cluster.workers).forEach(function(id) {
        cluster.workers[id].on('message', function(msg){
            console.log('[master] ' + 'message ' + msg);
        });
    });

} else if (cluster.isWorker) {
    console.log('[worker] ' + "start worker ..." + cluster.worker.id);

    process.on('message', function(msg) {
        console.log('[worker] '+msg);
        process.send('[worker] worker'+cluster.worker.id+' received!');
    });

    http.createServer(function (req, res) {
            res.writeHead(200, {"content-type": "text/html"});
            res.end('worker'+cluster.worker.id+',PID:'+process.pid);
    }).listen(3000);

}