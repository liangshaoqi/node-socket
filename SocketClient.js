let net = require('net')
let port = 9000;
let host = '127.0.0.1'
let client = new net.Socket()
client.setEncoding = 'UTF-8'

client.connect(port, host, () => {
    client.write('你好')
})
//接受服务端的数据
client.on('data', (data) => {
    console.log('服务器消息->'+ data)
    say()
})

client.on('error', (err) => {
    console.log('error:'+err)
})

client.on('close', () => {
    console.log('connection closed')
})
const readline = require('readline')

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function say() {
    r1.question('请输入:', (inputStr) => {
        if(inputStr != 'bye'){
            client.write(inputStr +'\n')
        }else{
            client.distroy()//关闭连接
            r1.close()
        }
    })
}