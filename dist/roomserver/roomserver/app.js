"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cache_1 = require("../lib/cache");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
const config_1 = require("../lib/config");
require("express-async-errors");
const app = express();
exports.app = app;
config_1.GetConfig.load().then(cfg => {
    const redisConfig = (cfg.redisType && cfg.redisType !== 'local') ? {
        port: cfg.redisPort,
        host: cfg.redisHost
    } : null;
    cache_1.CacheStore.init(redisConfig);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../site')));
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
}).catch(err => {
    console.log(`Load configuration failed: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=app.js.map