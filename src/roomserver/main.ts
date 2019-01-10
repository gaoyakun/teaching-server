import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as socketio from 'socket.io';
import * as cookie from 'cookie';
import { app } from './app';
import { Server } from '../lib/servermgr';
import { Session } from '../lib/session';
import { GetConfig } from '../lib/config';
import { Utils } from '../common/utils';
import { Client, Room, RoomManager } from './roommgr';
import { doCommand } from './commands';
import { MessageAssembler } from '../common/protoutils';

const useHttps = false;
const messageAssembler = new MessageAssembler ();

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
const server = http.createServer(app);
const serverHttps = useHttps ? https.createServer(options, app) : null;
const io = socketio(server, {
    transports: ['websocket']
});
GetConfig.load ().then(cfg => {
    io.use(async (socket, next) => {
        const data:any = socket.handshake || socket.request;
        if (data.headers.cookie) {
            const cookies:any = cookie.parse(data.headers.cookie);
            const sessionId = cookies[cfg.sessionToken];
            if (!sessionId) {
                return next (new Error('无法加入房间：未知用户'));
            }
            socket.request.session = await Session.loadSession(sessionId) || undefined;
            if (!socket.request.session) {
                return next (new Error('无法加入房间：未知用户'));
            }
            console.log (`Join room:${socket.request.session.loginUserAccount}`);
            return next();
        } else {
            return next (new Error('无法加入房间：无效请求'));
        }
    });
}).catch (err => {
    console.error (err);
    process.exit (-1);
});

io.on('connection', socket => {
    console.log ('Client connected');
    const data:any = socket.handshake || socket.request;
    if (!data || !data.query) {
        console.log ('Invalid handshake data');
        socket.disconnect ();
    }
    const roomId = Utils.safeParseInt(data.query.room);
    if (roomId === null) {
        console.log ('Invalid roomId parameter');
        socket.disconnect (true);
    } else {
        const client = new Client;
        client.init (socket).then (async () => {
            const room = await RoomManager.instance().findOrCreateRoom (roomId);
            if (!room) {
                console.log ('findOrCreateRoom failed');
                socket.disconnect (true);
            } else {
                room.addClient (client);
                socket.on ('disconnect', () => {
                    room.removeClient (client);
                });
            }
        }).catch (err => {
            console.log (err);
            socket.disconnect ();
        });
        socket.on ('message', (data:any) => {
            console.log (`Message received: ${typeof data}`);
            const buf = data as Buffer;
            const u8arr = new Uint8Array(buf);
            messageAssembler.put (u8arr);
            const msg = messageAssembler.getMessage ();
            if (msg) {
                console.log (`Got message ${msg.type}`);
            }
            (socket as any).binary(true).broadcast.emit ('message', data);
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
