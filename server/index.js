import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

io.on('connection', (socket) => {
    console.log('Client Connected: ',socket.id)

    socket.on('message', (body) => {
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(4)
        })
    })
})

httpServer.listen(3000)
console.log('Server on Port', 3000)