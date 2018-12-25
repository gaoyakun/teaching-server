"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const middlewares = require("./middlewares/middlewares");
const config_1 = require("./config");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
const install_1 = require("./routes/install");
const index_1 = require("./routes/index");
const api_1 = require("./routes/api");
require("express-async-errors");
config_1.Config.load();
exports.app = express();
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'ejs');
exports.app.use(logger('dev'));
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
exports.app.use(express.json());
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, '../../site')));
exports.app.use(middlewares.middlewareSession);
exports.app.use('/trust', middlewares.middlewareAuth);
exports.app.use('/api/trust', middlewares.middlewareAuth);
exports.app.use('/api', api_1.apiRouter);
exports.app.use('/install', install_1.installRouter);
exports.app.use('/', index_1.indexRouter);
exports.app.use((req, res, next) => {
    const session = req.session;
    res.render('error', {
        user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
        error: {
            code: 404,
            message: '对不起，您访问的页面不存在。'
        }
    });
});
exports.app.use((err, req, res, next) => {
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
exports.default = { app: exports.app };
//# sourceMappingURL=app.js.map