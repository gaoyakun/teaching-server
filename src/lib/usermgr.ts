import { Config } from './config';
import * as Redis from 'ioredis';

export class UserManager {
    private static _redis: Redis.Redis;
    static get redis () {
        return this._redis;
    }
    static init (config: Config) {
        this._redis = config.redis;
    }
    static async createRoom (userId: number) {
        this._redis.lpush (`user-rooms:${userId}`, )
    }
}