"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const express = require("express");
exports.indexRouter = express.Router();
exports.indexRouter.get('/', (req, res, next) => {
    if (!config_1.Config.test()) {
        res.redirect('/install/database');
    }
    else {
        const session = req.session;
        const data = {};
        if (session.loginUserId) {
            data.user = {
                name: session.loginUserAccount
            };
            res.render('index', data);
        }
        else {
            res.render('login');
        }
    }
});
exports.indexRouter.get('/login', (req, res, next) => {
    res.render('login');
});
exports.indexRouter.get('/register', (req, res, next) => {
    res.render('register');
});
exports.indexRouter.get('/profile', (req, res, next) => {
    const session = req.session;
    if (!session.loginUserId) {
        res.redirect('/login');
    }
    else {
        res.render('settings/userprofile', {
            user: {
                name: session.loginUserAccount
            }
        });
    }
});
//# sourceMappingURL=index.js.map