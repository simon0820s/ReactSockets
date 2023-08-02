import express from "express";
import http from 'http'
import { Server as SocketServer } from "socket.io";

const app = express()
const httpServer = http.createServer(app)
const io = new SocketServer(httpServer)

httpServer.listen(4000)
console.log('Server on Port', 4000)