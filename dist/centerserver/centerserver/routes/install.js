"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const config_1 = require("../../lib/config");
const engine_1 = require("../../lib/engine");
const express = require("express");
require("express-async-errors");
exports.installRouter = express.Router();
exports.installRouter.get('/', (req, res, next) => {
    res.redirect('/install/database');
});
exports.installRouter.get('/database', (req, res, next) => {
    const host = config_1.Config.databaseHost || '';
    const port = config_1.Config.databasePort ? String(config_1.Config.databasePort) : '';
    const user = config_1.Config.databaseUser || '';
    const password = config_1.Config.databasePassword || '';
    const name = config_1.Config.databaseName || '';
    res.render('install_db', { db: {
            host: host,
            port: port,
            user: user,
            password: password,
            name: name
        } });
});
exports.installRouter.post('/setup_database', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.host || !utils_1.Utils.safeParseInt(req.body.port) || !req.body.username || !req.body.password || !req.body.name) {
        res.json({
            err: errcodes_1.ErrorCode.kParamError
        });
    }
    else {
        const opt = {
            host: req.body.host,
            port: utils_1.Utils.safeParseInt(req.body.port),
            user: req.body.username,
            password: req.body.password,
        };
        const engine = new engine_1.Engine(opt);
        try {
            const session = yield engine.beginSession();
            const sqlDropDb = `drop database if exists \`${req.body.name}\``;
            yield session.query(sqlDropDb);
            const sqlCreateDb = `create database \`${req.body.name}\` default charset utf8mb4 collate utf8mb4_general_ci`;
            yield session.query(sqlCreateDb);
            const sqlUseDb = `use \`${req.body.name}\``;
            yield session.query(sqlUseDb);
            // create user table
            yield session.query(`create table \`user\` (
                \`id\` int auto_increment,
                \`account\` varchar(32) not null,
                \`email\` varchar(255) not null,
                \`passwd\` varchar(32) not null,
                \`name\` varchar(64) not null default '',
                \`state\` tinyint not null default 0,
                \`role\` tinyint not null default 0,
                \`server\` varchar(32) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            // create user profile table
            yield session.query(`create table \`user_profile\` (
                \`id\` int auto_increment,
                \`user_id\` int not null,
                \`gender\` tinyint not null default 0,
                \`mobile\` varchar(20) not null default '',
                \`avatar\` varchar(64) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            // create room table
            yield session.query(`create table \`room\` (
                \`id\` int auto_increment,
                \`owner\` int not null,
                \`creation_time\` int not null,
                \`close_time\` int not null default 0,
                \`type\` int not null default 0,
                \`state\` int not null default 0,
                \`server\` int not null default 0,
                \`name\` varchar(64) not null default '',
                \`detail\` varchar(256) not null default '',
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4`);
            res.redirect('/install/account');
        }
        catch (err) {
            console.error(err);
            res.json({
                err: errcodes_1.ErrorCode.kDatabaseError
            });
        }
    }
}));
exports.installRouter.get('/account', (req, res, next) => {
    res.render('install_account', {
        admin: {
            user: '',
            email: ''
        }
    });
});
exports.installRouter.post('/setup_admin', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.account || !req.body.email || !req.body.md5password) {
        res.json({
            err: errcodes_1.ErrorCode.kParamError
        });
    }
    else {
        const engine = config_1.Config.engine;
        const session = yield engine.beginSession();
        const id = 1;
        try {
            yield session.query({
                sql: 'insert into `user` (id, account, email, passwd, name) values (?, ?, ?, ?, "管理员")',
                param: [id, req.body.account, req.body.email, req.body.md5password]
            });
            yield session.query({
                sql: 'insert into `user_profile` (user_id, gender, mobile, avatar) values (?, ?, ?, ?)',
                param: [id, 0, '', '']
            });
            yield session.end();
            res.redirect('/');
        }
        catch (err) {
            yield session.cancel();
            console.error(err);
            res.json({
                err: errcodes_1.ErrorCode.kDatabaseError
            });
        }
    }
}));
/*
installRouter.get('/storage', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    res.render ('install_storage', {
        storage: {
            external: (Config.storageType || 'local') !== 'local',
            host: Config.storageHost || '',
            port: Config.storagePort || ''
        }
    });
});

installRouter.post('/setup_storage', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    let storageType = req.body.type;
    let storageHost = '';
    let storagePort = 0;
    if (storageType !== 'local') {
        const host = req.body.host;
        const port = Utils.safeParseInt(req.body.port);
        if (!host || !port) {
            return res.json ({
                err: ErrorCode.kParamError
            });
        } else {
            storageHost = host;
            storagePort = port;
        }
    }
    Config.storageType = storageType;
    Config.storageHost = storageHost;
    Config.storagePort = storagePort;
    Config.save ();

    res.redirect ('/');
});

*/
//# sourceMappingURL=install.js.map