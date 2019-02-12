"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
exports.indexRouter = express.Router();
exports.indexRouter.get('/', (req, res, next) => {
    res.render('index');
});
//# sourceMappingURL=index.js.map