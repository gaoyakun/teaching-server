import { Engine } from './engine';
import { Utils } from '../common/utils';
import { requestWrapper } from './requestwrapper';
import * as path from 'path';
import * as Redis from 'ioredis';

const REDIS_SESSION_KEY = 'session_list';
const REDIS_ROOMSERVER_KEY = 'roomserver_list';
const MAX_USER_ID_LENGTH = 8;
const CENTERSERVER_HOST = 'http://localhost';
const CENTERSERVER_PORT = 9999;

interface Config {
    sessionToken: string;
    redisSessionKey: string;
    dataPath: string;
    redisType: string;
    redisHost: string;
    redisPort: number;
    storageType: string;
    storageHost: string;
    storagePort: number;
    databaseHost: string;
    databasePort: number;
    databaseUser: string;
    databasePassword: string;
    databaseName: string;
    redis: Redis.Redis;
}

class GetConfig {
    private static _config: Config|null = null;
    private static _engine: Engine|null = null;
    private static _redis: Redis.Redis|null = null;
    static get redis (): Redis.Redis {
        if (!this._redis && this._config) {
            this._redis = new Redis (this._config.redisPort, this._config.redisHost);
        }
        if (!this._redis) {
            throw new Error ('Redis not initialized');
        }
        return this._redis;
    }
    static async load () {
        return this._config = JSON.parse(await requestWrapper(`${CENTERSERVER_HOST}:${CENTERSERVER_PORT}/api/config`, 'GET'));
    }
    static getUserDataPathById (userId: number): string {
        if (!Utils.isInt (userId)) {
            throw new Error (`[Config.getUserDataPathById]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error (`[Config.getUserDataPathById]: Invalid user id ${userId}`);
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return path.join (this.dataPath, strId);
    }
    static get sessionToken (): string {
        return this._config && this._config.sessionToken || '';
    }
    static get redisSessionKey (): string {
        return this._config && this._config.redisSessionKey || '';
    }
    static get dataPath (): string {
        return this._config && this._config.dataPath || '';
    }
    static get redisType (): string {
        return this._config && this._config.redisType || '';
    }
    static get redisHost (): string {
        return this._config && this._config.redisHost || '';
    }
    static get redisPort (): number {
        return this._config && this._config.redisPort || 0;
    }
    static get storageType (): string {
        return this._config && this._config.storageType || '';
    }
    static get storageHost (): string {
        return this._config && this._config.storageHost || '';
    }
    static get storagePort (): number {
        return this._config && this._config.storagePort || 0;
    }
    static get databaseHost (): string {
        return this._config && this._config.databaseHost || '';
    } 
    static get databasePort (): number {
        return this._config && this._config.databasePort || 0;
    }
    static get databaseUser (): string {
        return this._config && this._config.databaseUser || '';
    }
    static get databasePassword (): string {
        return this._config && this._config.databasePassword || '';
    }
    static get databaseName (): string {
        return this._config && this._config.databaseName || '';
    }
    static get engine (): Engine {
        if (!this._engine) {
            const opt = {
                host: this.databaseHost,
                port: this.databasePort,
                user: this.databaseUser,
                password: this.databasePassword,
                database: this.databaseName
            };
            this._engine = new Engine (opt);
        }
        return this._engine;
    }
}
export { REDIS_SESSION_KEY, REDIS_ROOMSERVER_KEY, CENTERSERVER_HOST, CENTERSERVER_PORT, Config, GetConfig };