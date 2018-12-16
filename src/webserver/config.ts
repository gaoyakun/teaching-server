import * as fs from 'fs';
import * as path from 'path';
import { Engine } from './lib/engine';

const configFileDir = path.join(__dirname, 'conf');
const jsonConfigFileName = path.join(configFileDir, 'server_config.json');

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
            if (this.test ()) {
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
    static test (): boolean {
        if (this.databaseHost && this.databasePort && this.databaseUser && this.databasePassword && this.databaseName) {
            return true;
        }
        return false;
    }
}