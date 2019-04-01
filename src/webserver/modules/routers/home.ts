import { Session } from '../../../lib/session';
import { Utils } from '../../../common/utils';
import { ErrorCode } from '../../../common/errcodes';
import { AssetManager } from '../../server/user/assets';
import { Config } from '../../../lib/config';
import { Server } from '../../../lib/servermgr';
import { ServerType } from '../../../lib/constants';
import { requestWrapper } from '../../../lib/requestwrapper';
import * as express from 'express';
import 'express-async-errors';

export function homePage(req:express.Request, res:express.Response) {
    const session:Session = req.session as Session;
    const data: any = {};
    if (session.loginUserId) {
        data.user = {
            name: session.loginUserAccount
        }
        res.render ('index', data);
    } else {
        res.render ('login');
    }
}

export function loginPage (req:express.Request, res:express.Response) {
    res.render ('login');
}

export function registerPage (req:express.Request, res:express.Response) {
    res.render ('register');
}

export async function profileSettingPage (req:express.Request, res:express.Response) {
    const session = req.session as Session;
    const user:any = await Config.engine.query ({
        sql:'select u.name as name, u.email as email, p.gender as gender, p.mobile as mobile, p.avatar as avatar from user u inner join user_profile p on u.id=p.user_id where u.id=?',
        param: [session.loginUserId]
    });
    if (!user || user.length !== 1) {
        throw new Error ('未找到该用户');
    }
    res.render ('settings/userprofile', {
        user: {
            id: session.loginUserId,
            name: user[0].name,
            email: user[0].email,
            gender: user[0].gender,
            mobile: user[0].mobile,
            avatar: user[0].avatar
        }
    });
}

export function resetPassSettingPage (req:express.Request, res:express.Response) {
    res.render ('settings/resetpass', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
}

export async function getImageAsset (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    const thumb: number = params.thumb;
    const relPath = req.query.relPath;
    const name = req.query.name;
    if (!name || !relPath) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kParamError));
    }
    const content = await AssetManager.readAssetContent((req.session as Session).loginUserId, relPath, name, thumb !== 0);
    if (!content) {
        return res.status(404).json (Utils.httpResult(ErrorCode.kFileNotFound));
    } else {
        res.writeHead (200, {
            'Content-Type': 'image/jpeg'
        });
        res.end (content);
    }
}

export async function getAvatar (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    const userId:number = params.id;
    try {
        const content = await AssetManager.readAvatarImage(userId);
        if (!content) {
            return res.status(404).json (Utils.httpResult(ErrorCode.kFileNotFound));
        } else {
            res.writeHead (200, {
                'Content-Type': 'image/jpeg'
            });
            res.end (content);
        }
    } catch (err) {
        res.redirect ('/images/face.jpg');
    }
}

export function assetsSettingPage (req:express.Request, res:express.Response) {
    res.render ('settings/assets', {
        user: {
            name: (req.session as Session).loginUserAccount
        }
    });
}

export async function sessionsSettingPage (req:express.Request, res:express.Response) {
    const session = req.session as Session;
    const sessionList:any = await Config.engine.objects('room').filter(['owner', session.loginUserId]).all();
    const sessionArray: any[] = [];
    for (let i = 0; i < sessionList.length; i++) {
        sessionArray.push ({
            id: sessionList[i].id,
            name: sessionList[i].name,
            detail: sessionList[i].detail,
            type: sessionList[i].type,
            state: sessionList[i].state
        });
    }
    res.render ('settings/sessions', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        sessions: sessionArray
    });
}

export async function publishRoomPage (req:express.Request, res:express.Response, next:express.NextFunction, params:any) {
    const session = req.session as Session;
    const roomId:number = params.room_id;
    // Query room information
    const rooms:any = await Config.engine.objects('room').filter(['id', roomId]).all();
    if (rooms.length !== 1) {
        throw new Error ('没有可以进入的房间');
    }
    let serverInfo: any = null;
    if (rooms[0].server === 0) {
        // room has not been published
        if (Number(rooms[0].owner) !== session.loginUserId) {
            throw new Error ('房间已关闭');
        }
        serverInfo = await Server.pickServer (ServerType.Room);
        if (!serverInfo) {
            throw new Error ('服务器维护中，目前无法进入房间');
        }
        await requestWrapper (`${serverInfo.host}:${serverInfo.port}/publish_room`, 'POST', {
            room: roomId
        });
    } else {
        // room has been published
        serverInfo = await Server.getServerInfo (ServerType.Room, Number(rooms[0].server));
        if (!serverInfo) {
            throw new Error ('服务器维护中，目前无法进入房间');
        }
    }
    res.render ('create_whiteboard', {
        user: {
            name: (req.session as Session).loginUserAccount
        },
        serverinfo: {
            host: `${serverInfo.host}:${serverInfo.port}?room=${roomId}&token=${(req.session as Session).id}`
        }
    });
}

export function whiteboardsSettingPage (req:express.Request, res:express.Response) {
    res.render ('settings/whiteboards', {
        user: {
            name: (req.session as Session).loginUserAccount,
        },
        whiteboards: []
    });
}

export function createWhiteboardPage (req:express.Request, res:express.Response) {
    res.render ('create_whiteboard', {
        user: {
            name: (req.session as Session).loginUserAccount,
        },
        serverinfo: null
    });
}

