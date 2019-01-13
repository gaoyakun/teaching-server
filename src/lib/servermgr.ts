import { Config } from './config';
import { Utils } from '../common/utils';
import * as readline from 'readline';
import * as constants from './constants';
import * as Redis from 'ioredis';

export class Server {
    private static readonly _expireTime = 5;
    private static readonly _ackInterval = 3;
    private static _type: constants.ServerType;
    private static _id: string;
    private static _ip: string;
    private static _port: number;
    private static _rank: number;
    private static _postTimer: NodeJS.Timer|null;
    private static _config: any;
    private static _redis: Redis.Redis;
    static get redis () {
        return this._redis;
    }
    static get id () {
        return Number(this._config.id);
    }
    static get address () {
        return this._ip;
    }
    static get port () {
        return this._port;
    }
    static async pickServer (type: constants.ServerType) {
        const rankKey = `server_rank:${type as number}`;
        while (true) {
            const serverId: string[] = await this._redis.zrange (rankKey, 0, 0);
            if (serverId && serverId.length === 1) {
                const info = await this._redis.hmget (serverId[0], 'ip', 'port');
                if (info && info[0] !== null && info[1] !== null) {
                    return { ip: info[0], port: info[1], id: parseInt(serverId[0].split(':')[2],10) };
                } else {
                    await this._redis.zrem (rankKey, serverId);
                    continue;
                }
            } else {
                break;
            }
        }
        return null;
    }
    static async getServerInfo (type: constants.ServerType, serverId: number) {
        const id = `svr:${type as number}:${serverId}`
        const info = await this._redis.hmget (id, 'ip', 'port');
        if (info && info[0] !== null && info[1] !== null) {
            return { ip: info[0], port: info[1], id: serverId };
        } else {
            return null;
        }
    }
    static init (type: constants.ServerType, config:Config, serverConfigJson:string) {
        this._type = type;
        this._rank = 0;
        this._postTimer = null;
        this._redis = config.redis;
        this._config = require (serverConfigJson);
        this._id = `svr:${type as number}:${this._config.id}`;
        this._ip = this._config.address;
        this._port = this._config.port;
        this._postTimer = setInterval (() => {
            this._post ();
        }, this._ackInterval * 1000);
    }
    static startCli (callback: (cmd:string, args:string[]) => void) {
        const rl = readline.createInterface ({
            input: process.stdin,
            output: process.stdout,
            prompt: '>'
        });
        rl.prompt();
        rl.on ('line', line => {
            if (Utils.isString (line)) {
                const cmdline: string[] = (line as string).trim().split(/\s+/);
                const command = cmdline.shift ();
                if (command === 'exit' || command === 'quit') {
                    process.exit (0);
                } else {
                    command && callback && callback (command, cmdline);
                }
            }
            rl.prompt();
        }).on ('close', ()=>{
            process.exit (0);
        });
    }
    static async shutdown () {
        if (this._postTimer) {
            clearTimeout (this._postTimer);
            this._postTimer = null;
        }
        if (this._id !== '') {
            await this._redis.multi().del (this._id).zrem (`server_rank:${this._type as number}`, this._id).exec();
        }
    }
    private static _post () {
        (async () => {
            await this._redis.multi().hmset(this._id, {
                ip: this._ip,
                port: this._port,
                rank: this._rank
            }).expire(this._id, this._expireTime).zadd (`server_rank:${this._type as number}`, String(this._rank||0), this._id).exec ();
        })().catch (err => {
            console.log (`ERR: [ServerInfo._post]: ${err}`);
            process.exit (-1);
        });
    }
}