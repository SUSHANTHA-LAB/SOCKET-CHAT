const io = require("socket.io")(3000, {
    cors: {
        origin: ["http://localhost:1234"],
    },
})

io.on('connect', (socket) =>{

    socket.on('chat message', (msg,room)=>{
        if(room === ""){
        socket.broadcast.emit('receive message',msg)}
        else{
        socket.to(room).emit('receive message',msg)
        }
    })
    socket.on('join-room', (room) =>{
        socket.join(room)
    })
})