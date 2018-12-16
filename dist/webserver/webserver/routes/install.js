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
const config_1 = require("../config");
const engine_1 = require("../lib/engine");
const express = require("express");
const router = express.Router();
router.get('/', (req, res, next) => {
    let session = req.session;
    if (session.loginUserId) {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
    else {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
    }
});
router.post('/setup_database', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
            yield session.query(`drop database if exists \`${req.body.name}\``);
            yield session.query(`create database \`${req.body.name}\` default charset utf8mb4 collate utf8mb4_general_ci`);
            yield session.query(`use \`${req.body.name}\``);
            yield session.query(`create table \`user\` (
                \`id\` int auto_increment,
                \`account\` varchar(32) unique not null,
                \`passwd\` varchar(32) not null,
                \`name\` varchar(64) not null default '',
                \`state\` tinyint not null default 0,
                \`role\` tinyint not null default 0,
                primary key (\`id\`)
            ) engine=InnoDB default charset=utf8mb4;`);
            config_1.Config.databaseHost = opt.host;
            config_1.Config.databasePort = opt.port;
            config_1.Config.databaseUser = opt.user;
            config_1.Config.databasePassword = opt.password;
            config_1.Config.databaseName = req.body.name;
            config_1.Config.save();
            res.redirect('/');
        }
        catch (err) {
            res.json({
                err: errcodes_1.ErrorCode.kDatabaseError
            });
        }
    }
}));
module.exports = router;
//# sourceMappingURL=install.js.map