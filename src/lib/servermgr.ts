import { UID } from './uid';
import { Config } from './config';
import * as constants from './constants';
import * as Redis from 'ioredis';

export class Server {
    private static readonly _expireTime = 5;
    private static readonly _ackInterval = 3;
    private static _redis: Redis.Redis;
    private static _type: constants.ServerType;
    private static _id: string;
    private static _ip: string;
    private static _port: number;
    private static _rank: number;
    private static _postTimer: NodeJS.Timer|null;
    static get redis () {
        return this._redis;
    }
    static init (type: constants.ServerType, ip:string, port:number, config:Config) {
        this._type = type;
        this._id = '';
        this._ip = ip;
        this._port = port;
        this._rank = 0;
        this._postTimer = null;
        this._redis = new Redis (config.redisPort, config.redisHost);
        this._postTimer = setInterval (() => {
            this._post ();
        }, this._ackInterval * 1000);
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
            if (this._id === '') {
                const serverId = await this._redis.incr (`server_id:${this._type as number}`);
                this._id = UID ('SVR', serverId);
            }
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