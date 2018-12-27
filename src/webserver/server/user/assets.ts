import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as sharp from 'sharp';
import { Utils } from '../../../common/utils';
import { UID } from '../../lib/uid';

const MAX_USER_ID_LENGTH:number = 16;
const THUMBNAIL_SIZE:number = 128;

export enum AssetType {
    Unknown = 0,
    Text,
    Image,
    Object
}

export class AssetManager {
    private static _userDataPath = path.join(os.homedir(), '.open_teaching', 'data');
    static getUserDataPathById (userId: number): string {
        return this._getUserDataPathById (userId);
    }
    static getUserAssetPathById (userId: number): string {
        return path.join(this.getUserDataPathById(userId), 'assets');
    }
    static async fileExists (filename: string) {
        return new Promise ((resolve, reject) => {
            fs.exists (filename, (exists: boolean) => {
                resolve (exists);
            });
        });
    }
    static async fileStat (filename: string) {
        return new Promise<fs.Stats> ((resolve, reject) => {
            fs.stat(filename, (err, stats) => {
                if (err) {
                    reject (err);
                } else {
                    resolve (stats);
                }
            });
        });
    }
    static async readDir (dir: string) {
        return new Promise<string[]> ((resolve, reject) => {
            fs.readdir (dir, (err, files) => {
                if (err) {
                    reject (err);
                } else {
                    resolve (files);
                }
            });
        });
    }
    static async mkDir (dir: string) {
        return new Promise ((resolve, reject) => {
            fs.mkdir (dir, err => {
                if (err) {
                    reject (err);
                } else {
                    resolve ();
                }
            });
        });
    }
    static async writeFile (filename: string, content: Buffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile (filename, content, err => {
                if (err) {
                    reject (err);
                } else {
                    resolve ();
                }
            });
        });
    }
    static async readFile (filename: string) {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile (filename, (err, data) => {
                if (err) {
                    reject (err);
                } else {
                    resolve (data);
                }
            });
        });
    }
    static async loadAssetList (userId: number, relPath: string) {
        const result: string[] = [];
        const dir = path.join (this.getUserAssetPathById(userId), relPath);
        if (await this.fileExists(dir) && (await this.fileStat(dir)).isDirectory()) {
            for (const file of await this.readDir (dir)) {
                if (file[0] !== '.') {
                    let curPath = path.join(dir, file);
                    if((await this.fileStat(curPath)).isDirectory()) {
                        result.push (file + '/');
                    } else {
                        result.push (file);
                    }
                }
            }
        }
        return result;
    }
    static async uploadAssetBaset64 (userId: number, relPath: string, contentBase64: string, filename: string) {
        return await this.uploadAssetBuffer (userId, relPath, new Buffer(contentBase64, 'base64'), filename);
    }
    static async uploadAssetBuffer (userId: number, relPath: string, buffer: Buffer, filename: string) {
        const filePath = path.join (this.getUserAssetPathById(userId), relPath);
        await this._mkdirs (filePath);
        const u = UID('FILE');
        let ext = path.extname(filename).toLowerCase();
        if (ext === '.jpeg') {
            ext = '.jpg';
        }
        const fullName = path.join (filePath, u + ext);
        await this.writeFile (fullName, buffer);

        const thumbFileName = path.join (filePath, `.${u}${ext}`);
        await sharp(buffer).resize (THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
            fit: 'contain',
            background: {r:0,g:0,b:0,alpha:1},
            withoutEnlargement: true
        }).toFile (thumbFileName);
    }
    static async readAssetContent (userId: number, relPath: string, filename: string, thumb: boolean) {
        try {
            if (thumb) {
                filename = '.' + filename;
            }
            const filePath = path.join (this.getUserAssetPathById(userId), relPath, filename);
            return await this.readFile (filePath);
        } catch (err) {
            return null;
        }
    }
    private static _getUserIdString (userId: number): string {
        if (!Utils.isInt (userId)) {
            throw new Error (`[AssetManager._getUserDataPath]: Invalid user id ${userId}`);
        }
        let strId = String(userId);
        if (strId.length > MAX_USER_ID_LENGTH) {
            throw new Error ('[AssetManager._getUserDataPath]: Invalid user id ${userId}');
        }
        for (let i = 0; i < MAX_USER_ID_LENGTH; i++) {
            strId = '0' + strId;
        }
        return strId;
    }
    private static _getUserDataPathById (userId: number): string {
        const strId = this._getUserIdString (userId);
        return path.join (this._userDataPath, strId);
    }
    private static async _mkdirs (dirpath: string) {
        if (!(await this.fileExists(dirpath))) {
            let pathtmp = '';
            for (const dirname of dirpath.split(/[/\\]/)) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!(await this.fileExists(pathtmp))) {
                    await this.mkDir (pathtmp)
                } else if (!(await this.fileStat(pathtmp)).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            }
        } else if (!(await this.fileStat(dirpath)).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
    private static _mkdirsSync(dirpath: string) { 
        if (!fs.existsSync(dirpath)) {
            let pathtmp = '';
            dirpath.split(/[/\\]/).forEach(function (dirname) {
                pathtmp = pathtmp ? path.join(pathtmp, dirname) : dirname;
                if (pathtmp === '') {
                    pathtmp = '/';
                }
                if (!fs.existsSync(pathtmp)) {
                    fs.mkdirSync (pathtmp)
                } else if (!fs.statSync(pathtmp).isDirectory()) {
                    throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
                }
            });
        } else if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(`[AssetManager._mkdirsSync] path already exists but is not a directory <${dirpath}>`);
        }
    }
}