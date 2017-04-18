/**
 * Created by ujipin on 16/12/13.
 */
var cluster = require('cluster');
var cpus = require('os').cpus().length;

//子进程监听消息处理函数
var workerListener = function (msg) {
    if(msg.access){
        console.log('user access %s, worker[%d]',msg.access.msg.worderid);
    }
};
//fork新的子进程函数
var forkWorker = function (listener) {
    var worker = cluster.fork();
    console.log('worker [%d] has been created',worker.process.pid);
    worker.on('message',listener);
    return worker;
};
//Cluster处理
if(cluster.isMaster){
    for(var i = 0; i < cpus; i++){
        forkWorker(workerListener);
    }
}else{
    var app = require('./app');
    return app.listen(8010);
}
//Cluster收到子进程退出消息
cluster.on('exit',function (worker,code,signal) {
    console.log('worker [%d] died %s, fork a new one',worker.process.pid,code || signal);
    forkWorker(workerListener);
});
//Cluster收到子进程运行消息
cluster.on('online',function (worker) {
    console.log('worker [%d] is running.',worker.process.pid);
});
