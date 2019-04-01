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
const xss = require("xss");
const path = require("path");
const express = require("express");
const utils_1 = require("../common/utils");
const errcodes_1 = require("../common/errcodes");
class RouteTool {
    static loadRouters(app, directory, json) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiConfig = require(json);
            const modules = {};
            const promises = [];
            for (const routeName in apiConfig.routes) {
                promises.push(Promise.resolve().then(() => require(path.join(directory, routeName))).then((m) => { modules[routeName] = m; }));
            }
            yield Promise.all(promises);
            const router = express.Router();
            app.use('/', router);
            for (const routeName in apiConfig.routes) {
                console.log(`Setting up route for ${routeName}`);
                const routePath = apiConfig.routes[routeName].path;
                const interfaces = apiConfig.routes[routeName].interfaces;
                for (const interfaceName in interfaces) {
                    console.log(`route interface ${interfaceName}`);
                    const f = modules[routeName][interfaceName];
                    if (!f) {
                        const msg = `Handler not found for <${routeName}/${interfaceName}>`;
                        console.log(msg);
                        throw new Error(`Handler not found for <${routeName}/${interfaceName}>`);
                    }
                    const i = interfaces[interfaceName];
                    const method = i.method || 'get';
                    const interfacePath = i.path;
                    const p = path.join(routePath, interfacePath).replace(/\\/g, '/');
                    console.log(`Route: ${interfaceName} --> ${p}`);
                    router.route(p)[method]((req, res, next) => __awaiter(this, void 0, void 0, function* () {
                        const t = [[i.queryParams, req.query || {}], [i.bodyParams, req.body || {}], [i.urlParams, req.params || {}], [i.headerParams, req.headers || {}], [i.cookieParams, req.cookies || {}]];
                        const paramResults = {};
                        for (const params of t) {
                            if (params[0]) {
                                if (!this._httpCheckParams(params[1], params[0], paramResults)) {
                                    if (req.xhr) {
                                        return res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kParamError));
                                    }
                                    else {
                                        const session = req.session;
                                        return res.render('error', {
                                            user: session && session.loginUserId ? { name: session.loginUserAccount } : undefined,
                                            error: {
                                                code: 400,
                                                message: '请求参数错误。'
                                            }
                                        });
                                    }
                                }
                            }
                        }
                        const r = f(req, res, next, paramResults);
                        return (r instanceof Promise) ? r : Promise.resolve(r);
                    }));
                }
            }
        });
    }
    static _httpCheckParams(container, params, results) {
        for (const name in params) {
            const param = container[name];
            const def = params[name];
            let val;
            if (!param) {
                if (def.default === undefined) {
                    return false;
                }
                else {
                    val = def.default;
                }
            }
            else if (param) {
                const type = def.type || 'string';
                if (type === 'string') {
                    if (!def.noXss && xss(param) !== param) {
                        return false;
                    }
                    val = param;
                }
                else if (type === 'int') {
                    val = utils_1.Utils.safeParseInt(param);
                    if (val === null) {
                        return false;
                    }
                }
                else if (type === 'float') {
                    val = utils_1.Utils.safeParseNumber(param);
                    if (val === null) {
                        return false;
                    }
                }
                else if (type === 'long') {
                    val = utils_1.Utils.safeParseLong(param);
                    if (val === null) {
                        return false;
                    }
                }
                else {
                    val = param;
                }
                if (def.enum) {
                    let match = false;
                    const isLongType = type === 'long';
                    def.enum.forEach(v => {
                        if (isLongType ? val.eq(v) : val === v) {
                            match = true;
                        }
                    });
                    if (!match) {
                        return false;
                    }
                }
            }
            results && (results[name] = val);
        }
        return true;
    }
}
exports.RouteTool = RouteTool;
//# sourceMappingURL=routetool.js.map