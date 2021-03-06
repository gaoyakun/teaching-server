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
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
const app_1 = require("./app");
const config_1 = require("../lib/config");
const servermgr_1 = require("../lib/servermgr");
const session_1 = require("../lib/session");
const roommgr_1 = require("./roommgr");
const commands_1 = require("./commands");
app_1.initializeApp().then(() => {
    const useHttps = config_1.Config.useSSL;
    const options = useHttps ? {
        key: fs.readFileSync(config_1.Config.sslKeyFile),
        cert: fs.readFileSync(config_1.Config.sslCertFile)
    } : {};
    /**
     * Get port from environment and store in Express.
     */
    const httpPort = normalizePort(config_1.Config.serverPort);
    /**
     * Create HTTP server.
     */
    const server = useHttps ? https.createServer(options, app_1.app) : http.createServer(app_1.app);
    const io = socketio(server, {
        transports: ['websocket']
    });
    io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
        const data = socket.handshake || socket.request;
        if (!data || !data.query || !data.headers) {
            return next(new Error('无法加入房间：无效的请求'));
        }
        const token = data.query.token;
        if (!token) {
            return next(new Error('无法加入房间：未知用户'));
        }
        socket.request.session = (yield session_1.Session.loadSession(token)) || undefined;
        if (!socket.request.session) {
            return next(new Error('无法加入房间：未知用户'));
        }
        console.log(`Join room:${socket.request.session.loginUserAccount}`);
        return next();
    }));
    io.on('connection', socket => {
        console.log('Client connected');
        RTCMultiConnectionServer.addSocket(socket);
        roommgr_1.RoomManager.instance().newClient(socket).catch(err => {
            console.log(err);
            socket.disconnect();
        });
    });
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(httpPort);
    server.on('error', onError);
    server.on('listening', onListening);
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
}).catch(err => {
    console.log(`Load configuration failed: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=main.js.map