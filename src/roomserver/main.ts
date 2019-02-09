import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as socketio from 'socket.io';
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
import { app, initializeApp } from './app';
import { Server } from '../lib/servermgr';
import { Session } from '../lib/session';
import { RoomManager } from './roommgr';
import { doCommand } from './commands';

const useHttps = false;

initializeApp ().then (()=> {
    const options = useHttps ? {
        key: fs.readFileSync('cert/1531277059027.key'),
        cert: fs.readFileSync('cert/1531277059027.pem')
    } : {};
    /**
     * Get port from environment and store in Express.
     */
    const httpPort = normalizePort(Server.port);
    const httpsPort = normalizePort(443);
    /**
     * Create HTTP server.
     */
    const server = http.createServer(app);
    const serverHttps = useHttps ? https.createServer(options, app) : null;
    const io = socketio(server, {
        transports: ['websocket']
    });
    io.use(async (socket, next) => {
        const data:any = socket.handshake || socket.request;
        if (!data || !data.query || !data.headers) {
            return next (new Error ('无法加入房间：无效的请求'));
        }
        const token = data.query.token;
        if (!token) {
            return next (new Error ('无法加入房间：未知用户'));
        }
        socket.request.session = await Session.loadSession(token) || undefined;
        if (!socket.request.session) {
            return next (new Error('无法加入房间：未知用户'));
        }
        console.log (`Join room:${socket.request.session.loginUserAccount}`);
        return next();
    });
    io.on('connection', socket => {
        console.log ('Client connected');
        RTCMultiConnectionServer.addSocket (socket);
        RoomManager.instance().newClient (socket).catch (err => {
            console.log (err);
            socket.disconnect ();
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
    function normalizePort(val: any) {
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
    function onError(error: any) {
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
    function onErrorHttps(error:any) {
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
        Server.startCli ( doCommand );
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
}).catch (err => {
    console.log (`Load configuration failed: ${err}`);
    process.exit (1);
});
