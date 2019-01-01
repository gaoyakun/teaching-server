"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const middlewares = require("./middlewares/middlewares");
const config_1 = require("../lib/config");
const cache_1 = require("../lib/cache");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
const index_1 = require("./routes/index");
const api_1 = require("./routes/api");
require("express-async-errors");
const app = express();
exports.app = app;
config_1.GetConfig.load().then(cfg => {
    const redisConfig = (config_1.GetConfig.redisType && config_1.GetConfig.redisType !== 'local') ? {
        port: config_1.GetConfig.redisPort,
        host: config_1.GetConfig.redisHost
    } : null;
    cache_1.CacheStore.init(redisConfig);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.urlencoded({ extended: false }));
    app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../site')));
    app.use(middlewares.middlewareSession);
    app.use('/trust', middlewares.middlewareAuth);
    app.use('/api/trust', middlewares.middlewareAuth);
    app.use('/api', api_1.apiRouter);
    app.use('/', index_1.indexRouter);
    app.use((req, res, next) => {
        const session = req.session;
        res.render('error', {
            user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
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
            const session = req.session;
            res.render('error', {
                user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
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