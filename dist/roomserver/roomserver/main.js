"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const fs = require("fs");
const socketio = require("socket.io");
const cookie = require("cookie");
const app_1 = require("./app");
const servermgr_1 = require("../lib/servermgr");
const session_1 = require("../lib/session");
const config_1 = require("../lib/config");
const utils_1 = require("../common/utils");
const roommgr_1 = require("./roommgr");
const commands_1 = require("./commands");
const useHttps = false;
const options = useHttps ? {
    key: fs.readFileSync('cert/1531277059027.key'),
    cert: fs.readFileSync('cert/1531277059027.pem')
} : {};
/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(8900);
const httpsPort = normalizePort(443);
/**
 * Create HTTP server.
 */
const server = http.createServer(app_1.app);
const serverHttps = useHttps ? https.createServer(options, app_1.app) : null;
const io = socketio(server, {
    transports: ['websocket']
});
config_1.GetConfig.load().then(cfg => {
    io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
        const data = socket.handshake || socket.request;
        if (data.headers.cookie) {
            const cookies = cookie.parse(data.headers.cookie);
            const sessionId = cookies[cfg.sessionToken];
            if (!sessionId) {
                return next(new Error('无法加入房间：未知用户'));
            }
            socket.request.session = (yield session_1.Session.loadSession(sessionId)) || undefined;
            if (!socket.request.session) {
                return next(new Error('无法加入房间：未知用户'));
            }
            console.log(`Join room:${socket.request.session.loginUserAccount}`);
            return next();
        }
        else {
            return next(new Error('无法加入房间：无效请求'));
        }
    }));
}).catch(err => {
    console.error(err);
    process.exit(-1);
});
io.on('connection', socket => {
    const data = socket.handshake || socket.request;
    if (!data || !data.query) {
        socket.disconnect();
    }
    const roomId = utils_1.Utils.safeParseInt(data.query.room);
    if (roomId === null) {
        socket.disconnect(true);
    }
    else {
        const client = new roommgr_1.Client;
        client.init(socket).then(() => {
            const room = roommgr_1.RoomManager.instance().findOrCreateRoom(roomId);
            room.addClient(client);
            socket.on('disconnect', () => {
                room.removeClient(client);
            });
        }).catch(err => {
            console.log(err);
            socket.disconnect();
        });
    }
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
    servermgr_1.Server.startCli(commands_1.doCommand);
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