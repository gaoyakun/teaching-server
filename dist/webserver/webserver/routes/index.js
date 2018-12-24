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
exports.indexRouter.get('/trust/settings/profile', (req, res, next) => {
    res.render('settings/userprofile', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
exports.indexRouter.get('/trust/settings/reset', (req, res, next) => {
    res.render('settings/resetpass', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
//# sourceMappingURL=index.js.map