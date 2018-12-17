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
        }
        else {
            data.user = null;
        }
        res.render('index', data);
    }
});
//# sourceMappingURL=index.js.map