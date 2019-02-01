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
function fileExists(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.exists(filename, (exists) => {
                resolve(exists);
            });
        });
    });
}
exports.fileExists = fileExists;
function fileStat(filename) {
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
exports.fileStat = fileStat;
function readDir(dir) {
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
exports.readDir = readDir;
function mkDir(dir) {
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
exports.mkDir = mkDir;
function writeFile(filename, content) {
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
exports.writeFile = writeFile;
function readFile(filename) {
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
exports.readFile = readFile;
function mkdirs(dirpath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield fileExists(dirpath))) {
            let pathtmp = '';
            for (const dirname of dirpath.split(/[/\\]/)) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!(yield fileExists(pathtmp))) {
                    yield mkDir(pathtmp);
                }
                else if (!(yield fileStat(pathtmp)).isDirectory()) {
                    throw new Error(`[mkdirs] path already exists but is not a directory <${dirpath}>`);
                }
            }
        }
        else if (!(yield fileStat(dirpath)).isDirectory()) {
            throw new Error(`[mkdirs] path already exists but is not a directory <${dirpath}>`);
        }
    });
}
exports.mkdirs = mkdirs;
function loadFileList(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        if ((yield fileExists(dir)) && (yield fileStat(dir)).isDirectory()) {
            for (const file of yield readDir(dir)) {
                if (file[0] !== '.') {
                    let curPath = path.join(dir, file);
                    if ((yield fileStat(curPath)).isDirectory()) {
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
exports.loadFileList = loadFileList;
//# sourceMappingURL=fileutils.js.map