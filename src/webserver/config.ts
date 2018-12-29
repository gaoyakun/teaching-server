import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Engine } from './lib/engine';
import { Utils } from '../common/utils';

const configFileDir = path.join(os.homedir(), '.open_teaching');
const jsonConfigFileName = path.join(configFileDir, 'server_config.json');
const defaultDataPath = path.join(configFileDir, 'data')
const defaultSessionToken = 'ts_session_id';
const MAX_USER_ID_LENGTH = 8;

export class Config {
    private static _config: any = null;
    private static _engine: Engine|null = null;
    static load () {
        try {
            if (fs.existsSync (jsonConfigFileName)) {
                const content = fs.readFileSync (jsonConfigFileName, 'utf-8');
                this._config = JSON.parse (content);
            }
        } catch (err) {
            console.log ('load configurations failed: ' + err);
            this._config = null;
        }
    }
    static save () {
        if (this._config) {
            try {
                if (!fs.existsSync (configFileDir)) {
                    fs.mkdirSync (configFileDir);
                }
                const content = JSON.stringify (this._config);
                fs.writeFileSync (jsonConfigFileName, content, 'utf-8');
            } catch (err) {
                console.log ('save configurations failed: ' + err);
            }
        }
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
        return this._config && this._config.sessionToken || defaultSessionToken;
    }
    static get dataPath (): string {
        return this._config && this._config.dataPath || defaultDataPath;
    }
    static get storageType (): string {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.type || null) : null;
    }
    static set storageType (type: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.type = type;
    }
    static get storageHost (): string {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.host || null) : null;
    }
    static set storageHost (host: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.host = host;
    }
    static get storagePort (): number {
        return this._config && this._config.storageConfig ? (this._config.storageConfig.port || null) : null;
    }
    static set storagePort (port: number) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.storageConfig) {
            this._config.storageConfig = {};
        }
        this._config.storageConfig.port = port;
    }
    static get databaseHost (): string {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.host || null) : null;
    } 
    static set databaseHost (host: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.host = host;
    }
    static get databasePort (): number {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.port || null) : null;
    }
    static set databasePort (port: number) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.port = port;
    }
    static get databaseUser (): string {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.user || null) : null;
    }
    static set databaseUser (user: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.user = user;
    }
    static get databasePassword (): string {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.password || null) : null;
    }
    static set databasePassword (password: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.password = password;
    }
    static get databaseName (): string {
        return this._config && this._config.databaseConfig ? (this._config.databaseConfig.name || null) : null;
    }
    static set databaseName (name: string) {
        if (!this._config) {
            this._config = {};
        }
        if (!this._config.databaseConfig) {
            this._config.databaseConfig = {};
        }
        this._config.databaseConfig.name = name;
    }
    static get engine (): Engine {
        if (!this._engine) {
            if (this.testDatabaseConfig ()) {
                const opt = {
                    host: this.databaseHost,
                    port: this.databasePort,
                    user: this.databaseUser,
                    password: this.databasePassword,
                    database: this.databaseName
                };
                this._engine = new Engine (opt);
            }
        }
        if (!this._engine) {
            throw new Error('Database engine not initialized');
        }
        return this._engine;
    }
    static testDatabaseConfig (): boolean {
        if (this.databaseHost && this.databasePort && this.databaseUser && this.databasePassword && this.databaseName) {
            return true;
        }
        return false;
    }
    static testStorageConfig (): boolean {
        const storageType = this.storageType;
        if (!storageType) {
            return false;
        }
        if (storageType !== 'local' && (this.storageHost === null || this.storagePort === null)) {
            return false;
        }
        return true;
    }
    static test (): boolean {
        return this.testStorageConfig() && this.testDatabaseConfig();
    }
}