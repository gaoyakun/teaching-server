"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const httpErrors = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
exports.app = express();
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'ejs');
exports.app.use(logger('dev'));
exports.app.use(express.urlencoded({ extended: false }));
exports.app.use(express.json());
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use((req, res, next) => {
    next(httpErrors(404));
});
exports.app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
exports.default = { app: exports.app };
