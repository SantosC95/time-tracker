import httpServer from "http"
import express from "express"

const app = express()
const server = httpServer.createServer(app)

server.listen(5000, () => console.log('Server up | Port: 5000'))