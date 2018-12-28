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
const config_1 = require("../config");
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const assets_1 = require("../server/user/assets");
const express = require("express");
require("express-async-errors");
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
exports.indexRouter.get('/trust/assets/image', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const thumb = utils_1.Utils.safeParseInt(req.query.thumb) || 0;
    const relPath = req.query.relPath;
    const name = req.query.name;
    if (!name || !relPath) {
        return res.status(404).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
    }
    const content = yield assets_1.AssetManager.readAssetContent(req.session.loginUserId, relPath, name, thumb !== 0);
    if (!content) {
        return res.status(404).json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kFileNotFound));
    }
    else {
        res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        });
        res.end(content);
    }
}));
exports.indexRouter.get('/trust/settings/assets', (req, res, next) => {
    res.render('settings/assets', {
        user: {
            name: req.session.loginUserAccount
        }
    });
});
exports.indexRouter.get('/trust/settings/sessions', (req, res, next) => {
    res.render('settings/sessions', {
        user: {
            name: req.session.loginUserAccount
        },
        sessions: [{
                name: '算法导论',
                detail: '算法导论讲座，主要讲解《算法导论》第四版内容，现已开放。'
            }, {
                name: '如何养猪',
                detail: '讲解养猪经验，欢迎前来学习。'
            }]
    });
});
//# sourceMappingURL=index.js.map