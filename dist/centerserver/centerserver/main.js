"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const path = require("path");
const http = require("http");
const https = require("https");
const fs = require("fs");
const config = require("../lib/config");
const config_1 = require("./config");
const servermgr_1 = require("../lib/servermgr");
const constants_1 = require("../lib/constants");
const config_2 = require("../lib/config");
const useHttps = false;
config_1.Config.load();
servermgr_1.Server.init(constants_1.ServerType.Center, config_2.CENTERSERVER_HOST, config_2.CENTERSERVER_PORT, config_1.Config, path.join(__dirname, 'conf', 'config.json'));
const options = useHttps ? {
    key: fs.readFileSync('cert/1531277059027.key'),
    cert: fs.readFileSync('cert/1531277059027.pem')
} : {};
/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(config.CENTERSERVER_PORT);
const httpsPort = normalizePort(443);
/**
 * Create HTTP server.
 */
const server = http.createServer(app_1.app);
const serverHttps = useHttps ? https.createServer(options, app_1.app) : null;
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(httpPort);
server.on('error', onError);
server.on('listening', onListening);
if (useHttps && serverHttps) {
    serverHttps.listen(httpsPort);
    serverHttps.on('error', onErrorHttps);
    serverHttps.on('listening', onListeningHttps);
}
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof httpPort === 'string'
        ? 'Pipe ' + httpPort
        : 'Port ' + httpPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "error" event.
 */
function onErrorHttps(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof httpsPort === 'string'
        ? 'Pipe ' + httpsPort
        : 'Port ' + httpsPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
    setTimeout(() => {
        servermgr_1.Server.startCli((cmd, args) => {
            console.log(`${cmd}(${args.join(',')})`);
        });
    }, 1000);
}
function onListeningHttps() {
    if (serverHttps) {
        const addr = serverHttps.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        console.log('Listening on ' + bind);
    }
}
//# sourceMappingURL=main.js.map