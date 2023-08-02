import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

io.on('connection', socket => {
    console.log('Client Connected')
})

httpServer.listen(3000)
console.log('Server on Port', 3000)