import * as path from 'path';
import * as sharp from 'sharp';
import { UID } from '../../../lib/uid';
import { Config } from '../../../lib/config';
import * as fileutils from '../../../lib/fileutils';

const THUMBNAIL_SIZE:number = 128;

export class AssetManager {
    private static _imageExt = ['.jpg','.jpeg','.png','.webp'];
    static isImageFile (filename: string): boolean {
        return this._imageExt.indexOf(path.extname(filename).toLowerCase()) >= 0;
    }
    static getUserAssetPathById (userId: number): string {
        return path.join(Config.getUserDataPathById(userId), 'assets');
    }
    static getUserAvatarPathById (userId: number): string {
        return path.join(Config.getUserDataPathById(userId), 'avatar');
    }
    static async loadAssetList (userId: number, relPath: string) {
        const dir = path.join (this.getUserAssetPathById(userId), relPath);
        return fileutils.loadFileList (dir);
    }
    static async uploadAssetBase64 (userId: number, relPath: string, contentBase64: string, filename: string) {
        return await this.uploadAssetBuffer (userId, relPath, new Buffer(contentBase64, 'base64'), filename);
    }
    static async uploadAssetBuffer (userId: number, relPath: string, buffer: Buffer, filename: string) {
        return await this._uploadFile (path.join (this.getUserAssetPathById(userId), relPath), buffer, filename, undefined, true);
    }
    static async uploadUserAvatar (userId: number, buffer: Buffer, filename: string) {
        return await this._uploadFile (this.getUserAvatarPathById(userId), buffer, filename, 'avatar.jpg');
    }
    static async readAvatarImage (userId: number) {
        const avatarFileName = `${this.getUserAvatarPathById(userId)}/avatar.jpg`;
        return await fileutils.readFile (avatarFileName);
    }
    static async readAssetContent (userId: number, relPath: string, filename: string, thumb: boolean) {
        try {
            if (thumb) {
                filename = '.' + filename;
            }
            const filePath = path.join (this.getUserAssetPathById(userId), relPath, filename);
            return await fileutils.readFile (filePath);
        } catch (err) {
            return null;
        }
    }
    private static async _uploadFile (filePath: string, buffer: Buffer, filename: string, saveName?: string, createThumbnail?: boolean) {
        await fileutils.mkdirs (filePath);
        const u = UID('FILE');
        if (this.isImageFile (filename)) {
            let ext = path.extname(filename).toLowerCase();
            if (ext === '.jpeg') {
                ext = '.jpg';
            }
            const fullName = path.join (filePath, saveName || u + ext);
            await fileutils.writeFile (fullName, buffer);

            if (createThumbnail) {
                const thumbFileName = path.join (filePath, `.${u}${ext}`);
                await sharp(buffer).resize (THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
                    fit: 'inside',
                    background: {r:0,g:0,b:0,alpha:1},
                    withoutEnlargement: true
                }).toFile (thumbFileName);
            }
        } else {
            throw new Error('Unknown file type');
        }
    }
}