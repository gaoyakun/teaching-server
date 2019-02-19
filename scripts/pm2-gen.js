const path = require ('path');
const os = require ('os');
const fs = require ('fs');
let cmdlineParams = null;

function getCommandLineParams () {
    const [node, path, ...argv] = process.argv;
    let result = {};
    let key = '';
    let val = '';
    for (let i = 0; i < argv.length; i++) {
        if (argv[i].startsWith ('--')) {
            if (key !== '') {
                result[key] = val;
            }
            key = argv[i].slice (2);
            val = '';
        } else if (val !== '') {
            throw new Error (`Invalid command line parameter ${val}`);
        } else {
            val = argv[i];
        }
    }
    if (key !== '') {
        result[key] = val;
    }
    return result;
}

function getParam (name, defaultValue) {
    if (!cmdlineParams) {
        cmdlineParams = getCommandLineParams ();
    }
    return cmdlineParams[name]||process.env[`OT_${name.toUpperCase()}`] || (typeof defaultValue === 'string' ? defaultValue : defaultValue(name));
}

function getTurnServer (str) {
    const info = str.split ('|');
    if (info.length === 1) {
        return {
            urls: [info[0]]
        };
    } else if (info.length === 3) {
        return {
            urls: [info[0]],
            username: info[1],
            credential: info[2]
        }
    } else {
        throw new Error (`Invalid turn server parameter ${str}`);
    }
}

function dieForParam (param) {
    throw new Error (`Parameter required: ${param}`);
}

function useSSL () {
    return getParam ('ssl', 'off') === 'on';
}

const centerServerId = parseInt(getParam ('center-server-id', '1'));
const centerServerHost = getParam ('center-server-host', '127.0.0.1');
const centerServerPort = parseInt(getParam ('center-server-port', '9999'));
const webServerId = parseInt(getParam ('web-server-id', '1'));
const webServerHost = getParam ('web-server-host', '127.0.0.1');
const webServerPort = parseInt(getParam ('web-server-port', '9999'));
const roomServerId = parseInt(getParam ('room-server-id', '1'));
const roomServerHost = getParam ('room-server-host', '127.0.0.1');
const roomServerPort = parseInt(getParam ('room-server-port', '9999'));
const databasePass = getParam ('database-pass', '123456');
const databaseHost = getParam ('database-host', 'localhost');
const databaseName = getParam ('database-name', 'open-teaching-web');
const sslOn = useSSL ();
const sslCert = sslOn ? getParam ('ssl-cert', dieForParam) : '';
const sslKey = sslOn ? getParam ('ssl-key', dieForParam) : '';
const dataPath = getParam ('data-path', path.join(os.homedir(), '.open_teaching', 'data'));
const announcedIPv4 = getParam ('announced-ipv4', '47.89.22.104');
const turnServers = [getTurnServer(getParam ('turnserver', 'turn:47.89.22.104:3478|gyk|bigsail'))];

const out = getParam ('out', 'launch_config.js');

const template = `
const path = require('path');
module.exports = {
    apps: [{
        name: 'centerserver',
        script: path.join(__dirname, '..', 'dist', 'centerserver', 'centerserver', 'main.js'),
        env: {
            OT_SERVER_ID: '${centerServerId}',
            OT_SERVER_HOST: '${centerServerHost}',
            OT_SERVER_PORT: '${centerServerPort}',
            OT_DATABASE_PASS: '${databasePass}',
            OT_DATABASE_HOST: '${databaseHost}',
            OT_DATABASE_NAME: '${databaseName}',
            OT_SSL: '${sslOn ? 'on' : 'off'}',
            OT_SSL_CERT: '${sslCert}',
            OT_SSL_KEY: '${sslKey}',
            OT_DATA_PATH: '${dataPath}'
        }
    }, {
        name: 'webserver',
        script: path.join(__dirname, '..', 'dist', 'webserver', 'webserver', 'main.js'),
        env: {
            OT_SERVER_ID: '${webServerId}',
            OT_SERVER_HOST: '${webServerHost}',
            OT_SERVER_PORT: '${webServerPort}',
            OT_DATABASE_PASS: '${databasePass}',
            OT_DATABASE_HOST: '${databaseHost}',
            OT_DATABASE_NAME: '${databaseName}',
            OT_SSL: '${sslOn ? 'on' : 'off'}',
            OT_SSL_CERT: '${sslCert}',
            OT_SSL_KEY: '${sslKey}',
            OT_DATA_PATH: '${dataPath}'
        }
    }, {
        name: 'roomserver',
        script: path.join(__dirname, '..', 'dist', 'roomserver', 'roomserver', 'main.js'),
        env: {
            OT_SERVER_ID: '${roomServerId}',
            OT_SERVER_HOST: '${roomServerHost}',
            OT_SERVER_PORT: '${roomServerPort}',
            OT_DATABASE_PASS: '${databasePass}',
            OT_DATABASE_HOST: '${databaseHost}',
            OT_DATABASE_NAME: '${databaseName}',
            OT_SSL: '${sslOn ? 'on' : 'off'}',
            OT_SSL_CERT: '${sslCert}',
            OT_SSL_KEY: '${sslKey}',
            OT_DATA_PATH: '${dataPath}',
            OT_RTC_ANNOUNCED_IPV4: '${announcedIPv4}',
            OT_TURN_SERVERS: '${JSON.stringify (turnServers)}'
        }
    }]
}
`;

fs.writeFileSync (out, template, 'utf-8');