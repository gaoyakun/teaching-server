"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const https = require("https");
const fs = require("fs");
const config_1 = require("../lib/config");
const servermgr_1 = require("../lib/servermgr");
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
     * Create HTTP(s) server.
     */
    const server = useHttps ? https.createServer(options, app_1.app) : http.createServer(app_1.app);
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
        setTimeout(() => {
            servermgr_1.Server.startCli((cmd, args) => {
                console.log(`${cmd}(${args.join(',')})`);
            });
        }, 1000);
    }
}).catch(err => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map