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
const fs = require("fs");
const path = require("path");
const os = require("os");
const sharp = require("sharp");
const utils_1 = require("../../../common/utils");
const uid_1 = require("../../lib/uid");
const MAX_USER_ID_LENGTH = 16;
const THUMBNAIL_SIZE = 128;
var AssetType;
(function (AssetType) {
    AssetType[AssetType["Unknown"] = 0] = "Unknown";
    AssetType[AssetType["Text"] = 1] = "Text";
    AssetType[AssetType["Image"] = 2] = "Image";
    AssetType[AssetType["Object"] = 3] = "Object";
})(AssetType = exports.AssetType || (exports.AssetType = {}));
class AssetManager {
    static getUserDataPathById(userId) {
        return this._getUserDataPathById(userId);
    }
    static getUserAssetPathById(userId) {
        return path.join(this.getUserDataPathById(userId), 'assets');
    }
    static fileExists(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.exists(filename, (exists) => {
                    resolve(exists);
                });
            });
        });
    }
    static fileStat(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.stat(filename, (err, stats) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(stats);
                    }
                });
            });
        });
    }
    static readDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(files);
                    }
                });
            });
        });
    }
    static mkDir(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.mkdir(dir, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    static writeFile(filename, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.writeFile(filename, content, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    static readFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs.readFile(filename, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    static loadAssetList(userId, relPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const dir = path.join(this.getUserAssetPathById(userId), relPath);
            if ((yield this.fileExists(dir)) && (yield this.fileStat(dir)).isDirectory()) {
                for (const file of yield this.readDir(dir)) {
                    if (file[0] !== '.') {
                        let curPath = path.join(dir, file);
                        if ((yield this.fileStat(curPath)).isDirectory()) {
                            result.push(file + '/');
                        }
                        else {
                            result.push(file);
                        }
                    }
                }
            }
            return result;
        });
    }
    static uploadAssetBaset64(userId, relPath, contentBase64, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploadAssetBuffer(userId, relPath, new Buffer(contentBase64, 'base64'), filename);
        });
    }
    static uploadAssetBuffer(userId, relPath, buffer, filename) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path.join(this.getUserAssetPathById(userId), relPath);
            yield this._mkdirs(filePath);
            const u = uid_1.UID('FILE');
            let ext = path.extname(filename).toLowerCase();
            if (ext === '.jpeg') {
                ext = '.jpg';
            }
            const fullName = path.join(filePath, u + ext);
            yield this.writeFile(fullName, buffer);
            const thumbFileName = path.join(filePath, `.${u}${ext}`);
            yield sharp(buffer).resize(THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 1 },
                withoutEnlargement: true
            }).toFile(thumbFileName);
        });
    }
    static readAssetContent(userId, relPath, filename, thumb) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (thumb) {
                    filename = '.' + filename;
                }
                const filePath = path.join(this.getUserAssetPathById(userId), relPath, filename);
                return yield this.readFile(filePath);
            }
            catch (err) {
                return null;
            }
        });
    }
    static _getUserIdString(userId) {
        if (!utils_1.Utils.isInt(userId)) {
            throw new Error(`[AssetManager._getUserDataPath]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error('[AssetManager._getUserDataPath]: Invalid user id ${userId}');
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return strId;
    }
    static _getUserDataPathById(userId) {
        const strId = this._getUserIdString(userId);
        return path.join(this._userDataPath, strId);
    }
    static _mkdirs(dirpath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.fileExists(dirpath))) {
                let pathtmp = '';
                for (const dirname of dirpath.split(/[/\\]/)) {
                    pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                    if (pathtmp === '') {
                        pathtmp = '/';
                    }
                    if (!(yield this.fileExists(pathtmp))) {
                        yield this.mkDir(pathtmp);
                    }
                    else if (!(yield this.fileStat(pathtmp)).isDirectory()) {
                        throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                    }
                }
            }
            else if (!(yield this.fileStat(dirpath)).isDirectory()) {
                throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
            }
        });
    }
    static _mkdirsSync(dirpath) {
        if (!fs.existsSync(dirpath)) {
            let pathtmp = '';
            dirpath.split(/[/\\]/).forEach(function (dirname) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!fs.existsSync(pathtmp)) {
                    fs.mkdirSync(pathtmp);
                }
                else if (!fs.statSync(pathtmp).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            });
        }
        else if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
}
AssetManager._userDataPath = path.join(os.homedir(), '.open_teaching', 'data');
exports.AssetManager = AssetManager;
//# sourceMappingURL=assets.js.map