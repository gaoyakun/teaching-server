"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const express = require("express");
require("express-async-errors");
exports.indexRouter = express.Router();
exports.indexRouter.get('/', (req, res, next) => {
    if (!config_1.Config.test()) {
        res.redirect('/install/database');
    }
    else {
        res.render('index');
    }
});
//# sourceMappingURL=index.js.map