import { app } from './app';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as proto from '../common/protocols/protolist';
import { Packet, MessageAssembler } from '../common/protoutils';

(function () {
    const packet = Packet.create(proto.MsgType.test_TestMessage, {
        testField: 'hello'
    });
    const packet2 = Packet.create(proto.MsgType.test2_Test2Message, {
        test2Field: 'hello2'
    });
    const msgAssembler = new MessageAssembler ();
    msgAssembler.put (packet.buffer as Uint8Array);
    msgAssembler.put (packet2.buffer as Uint8Array);
    console.log (msgAssembler.getMessage());
    console.log (msgAssembler.getMessage());
}());

const useHttps = false;

const options = useHttps ? {
    key: fs.readFileSync('cert/1531277059027.key'),
    cert: fs.readFileSync('cert/1531277059027.pem')
} : {};

/**
 * Get port from environment and store in Express.
 */
const httpPort = normalizePort(8888);
const httpsPort = normalizePort(443);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const serverHttps = useHttps ? https.createServer(options, app) : null;

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
