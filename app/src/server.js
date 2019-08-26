import "@babel/polyfill/noConflict"
import httpServer from "http"
import app from "./app"
import { setFolders } from "./lib/utils/utils"

const run = async () => {
    const server = httpServer.createServer(app)
    await setFolders()
    server.listen(5000, () => console.log('Server up | Port: 5000'))
}

/** Run Server */
run()

/** Handle some unexpected errors */
process.on('uncaughtException', ( error ) => console.error(`Error: ${error.message} | ${error.stack}`, error))
process.on('unhandledRejection', ( error ) => console.error(`Error: ${error.message} | ${error.stack}`, error))