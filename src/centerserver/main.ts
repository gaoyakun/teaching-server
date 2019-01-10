import { app } from './app';
import * as path from 'path';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as config from '../lib/config';
import { Config } from './config';
import { Server } from '../lib/servermgr';
import { ServerType } from '../lib/constants';
import { CENTERSERVER_HOST, CENTERSERVER_PORT } from '../lib/config';
const useHttps = false;

Config.load ();
Server.init ( ServerType.Center, CENTERSERVER_HOST, CENTERSERVER_PORT, Config, path.join(__dirname, 'conf', 'config.json'));

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

    setTimeout (() => {
        Server.startCli ((cmd:string, args: string[]) => {
            console.log (`${cmd}(${args.join(',')})`);
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
