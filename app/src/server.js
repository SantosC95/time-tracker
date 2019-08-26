import "@babel/polyfill/noConflict"
import httpServer from "http"
import app from "./app"

const server = httpServer.createServer(app)
server.listen(5000, () => console.log('Server up | Port: 5000'))

/** Handle some unexpected errors */
process.on('uncaughtException', ( error ) => console.error(`Error: ${error.message} | ${error.stack}`, error))
process.on('unhandledRejection', ( error ) => console.error(`Error: ${error.message} | ${error.stack}`, error))