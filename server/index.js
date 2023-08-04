import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";
import { resolve } from "path";
import { PORT } from "./config.js";
import morgan from "morgan";

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

app.use(morgan('dev'))
app.use(express.static(resolve('frontend/dist')))

io.on('connection', (socket) => {
    console.log('Client Connected: ', socket.id)

    socket.on('message', (body) => {
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(4)
        })
    })
})

httpServer.listen(PORT)
console.log('Server on Port', PORT)