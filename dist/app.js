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
const express = require("express");
const path = require("path");
const engine = require("./lib/engine");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middlewares = require("./middlewares/middlewares");
require('express-async-errors');
exports.app = express();
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'ejs');
exports.app.use(logger('dev'));
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(express.json());
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use(middlewares.middlewareSession);
exports.app.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const e = new engine.Engine({ user: 'root', password: '123456' });
    const databases = yield e.query('show databases');
    console.log(databases);
    yield e.close();
    throw Error('aysnc error test');
}));
exports.app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err.message);
});
exports.default = { app: exports.app };
//# sourceMappingURL=app.js.map