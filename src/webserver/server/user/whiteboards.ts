import * as path from 'path';
import * as sharp from 'sharp';
import { UID } from '../../../lib/uid';
import { GetConfig } from '../../../lib/config';
import * as fileutils from '../../../lib/fileutils';

const THUMBNAIL_SIZE:number = 128;

export class WhiteboardManager {
    static getUserAssetPathById (userId: number): string {
        return path.join(GetConfig.getUserDataPathById(userId), 'whiteboards');
    }
    static async loadAssetList (userId: number, relPath: string) {
        const dir = path.join (this.getUserAssetPathById(userId), relPath);
        return fileutils.loadFileList (dir);
    }
    static async uploadAssetBase64 (userId: number, relPath: string, width: number, height: number, channels: 1|2|3|4, boardData: string, contentBase64: string, filename: string) {
        return await this.uploadAssetBuffer (userId, relPath, width, height, channels, boardData, new Buffer(contentBase64, 'base64'), filename);
    }
    static async uploadAssetBuffer (userId: number, relPath: string, width: number, height: number, channels: 1|2|3|4, boardData: string, buffer: Buffer, filename: string) {
        const filePath = path.join (this.getUserAssetPathById(userId), relPath);
        await fileutils.mkdirs (filePath);
        const u = UID('FILE');

        const fullName = path.join (filePath, u + '.wb');
        await fileutils.writeFile (fullName, boardData);

        const thumbFileName = path.join (filePath, `.${u}.jpg`);
        await sharp(buffer, {
            raw: {
                width: width,
                height: height,
                channels: channels
            }
        }).resize (THUMBNAIL_SIZE, THUMBNAIL_SIZE, {
            fit: 'contain',
            background: {r:0,g:0,b:0,alpha:1},
            withoutEnlargement: true
        }).toFile (thumbFileName);
    }
    static async readAssetContent (userId: number, relPath: string, filename: string, thumb: boolean) {
        try {
            if (thumb) {
                const index = filename.lastIndexOf('.');
                filename = '.' + filename.substring(0, index) + '.jpg';
            }
            const filePath = path.join (this.getUserAssetPathById(userId), relPath, filename);
            return await fileutils.readFile (filePath);
        } catch (err) {
            return null;
        }
    }
 }