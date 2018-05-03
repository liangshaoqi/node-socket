let net = require('net')

//创建服务
let chatServer = net.createServer()
let clientMap = new Object()

let i = 0;//连接名称的流水号
chatServer.on('connection', (client) => {
    //记录下流水号
    ++i
    console.log(`用户${i}上线~`)
    client.name = '用户' + i;
    clientMap[client.name] = client
    //对客户端发送消息的监听
    client.on('data', (data) => {
        console.log(`客户端信息:${data}`)
        //将信息传递给所有的客户端
        broadcast(data, client)
    })
    //数据错误处理
    client.on('error', (err) => {
        console.log(`client err: ${err}`)
        client.end()
    })
    //客户端关闭事件
    client.on('close', (data) => {
        delete clientMap[client.name]
        console.log(client.name + "下线了")
        //广播
        broadcast(client.name + '下线了',client)
    })
})

//消息广播方法
function broadcast(message, client) {
    for(let key in clientMap){
        clientMap[key].write(client.name + message + '\n')
    }
}


chatServer.listen(9000)
