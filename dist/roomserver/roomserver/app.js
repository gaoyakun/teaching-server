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
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middlewares = require("../lib/middlewares");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
const config_1 = require("../lib/config");
const constants_1 = require("../lib/constants");
require("express-async-errors");
const servermgr_1 = require("../lib/servermgr");
const index_1 = require("./routes/index");
const app = express();
exports.app = app;
function initializeApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield config_1.GetConfig.load();
        servermgr_1.Server.init(constants_1.ServerType.Room, config_1.GetConfig, path.join(__dirname, 'conf', 'config.json'));
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
        app.use(logger('dev'));
        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());
        app.use(cookieParser());
        app.use(express.static(path.join(__dirname, '../../site')));
        app.use(middlewares.middlewareSession);
        app.use('/', index_1.indexRouter);
        app.use((req, res, next) => {
            res.render('error', {
                error: {
                    code: 404,
                    message: '对不起，您访问的页面不存在。'
                }
            });
        });
        app.use((err, req, res, next) => {
            console.error(err.stack);
            if (req.xhr) {
                res.status(500).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kServerError));
            }
            else {
                res.render('error', {
                    error: {
                        code: err.code ? Number(err.code) : 500,
                        message: String(err.message) || '对不起，服务器错误，请联系客服。'
                    }
                });
            }
        });
    });
}
exports.initializeApp = initializeApp;
//# sourceMappingURL=app.js.map