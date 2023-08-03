import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

io.on('connection', (socket) => {
    console.log('Client Connected')

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('message', data)
    })
})

httpServer.listen(3000)
console.log('Server on Port', 3000)