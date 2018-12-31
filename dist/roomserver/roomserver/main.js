"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const fs = require("fs");
const socketio = require("socket.io");
const useHttps = false;
const options = useHttps ? {
    key: fs.readFileSync('cert/1531277059027.key'),
    cert: fs.readFileSync('cert/1531277059027.pem')
} : {};
/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(8900);
const httpsPort = normalizePort(8443);
/**
 * Create HTTP server.
 */
const server = http.createServer();
const serverHttps = useHttps ? https.createServer(options) : null;
const io = socketio(server);
io.on('connection', socket => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('message', obj => {
        io.emit('message', obj);
    });
});
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