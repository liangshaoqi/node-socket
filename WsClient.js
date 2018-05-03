let ws = new WebSocket('ws://127.0.0.1:9000')
ws.opopen = () => {
    ws.send('大家好')
}

ws.onmessage = (event) => {
    //获取id中的内容
    let chartroot = document.querySelector('#chatroom')
    //设置html
    chartroot.innerHTML += '<br/>' + event.data
}
//关闭事件
ws.onclose = () => {
    console.log('关闭')
}
//错误事件
ws.onerror = (err) => {
    console.log('error:'+ err)
}