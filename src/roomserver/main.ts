import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';
import * as socketio from 'socket.io';
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
import { app, initializeApp } from './app';
import { Server } from '../lib/servermgr';
import { Session } from '../lib/session';
import { RoomManager } from './roommgr';
import { doCommand } from './commands';

initializeApp ().then (()=> {
    const useHttps = Server.ssl;

    const options = useHttps ? {
        key: fs.readFileSync(path.join(__dirname, 'cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert/cert.pem'))
    } : {};
    /**
     * Get port from environment and store in Express.
     */
    const httpPort = normalizePort(Server.port);
    /**
     * Create HTTP server.
     */
    const server = useHttps ? https.createServer(options, app) : http.createServer(app);
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
}).catch (err => {
    console.log (`Load configuration failed: ${err}`);
    process.exit (1);
});
