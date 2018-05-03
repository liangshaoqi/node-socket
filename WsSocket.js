var WebSocketServer  = require("ws").Server,
    wss = new WebSocketServer({port:9000})
let clientMap = new Object()
let i = 0

wss.on('connection', (ws) => {
    console.log(ws + '上线')
    ++i
    //设置属性名
    ws.name = '用户' + i
    clientMap[ws.name]  = ws
    ws.on('message' , (message) => {
        //引用广播
        broadcast(message, ws)
    })
    //关闭事件
    ws.on('close', () => {
        global.gc()//调用内存回收
        console.log('离开')
    })
})
//广播方法
function broadcast(message, ws){
    for(let key in clientMap){
        clientMap[key].send(ws.name + '说:' + message)
    }
}