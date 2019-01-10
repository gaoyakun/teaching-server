import * as express from 'express';
import 'express-async-errors';
import { Utils } from '../../common/utils';
import { ErrorCode } from '../../common/errcodes';
import { Client, Room, RoomManager } from '../roommgr';

export const indexRouter = express.Router();

indexRouter.get('/rooms', (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const rooms = RoomManager.instance().rooms;
    const ret = Utils.httpResult(ErrorCode.kSuccess);
    ret.data = [];
    for (const id in rooms) {
        ret.data.push (id);
    }
    res.json (ret);
});

indexRouter.post('/publish_room', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const roomId = Utils.safeParseInt(req.body.room);
    if (!roomId) {
        return res.json (Utils.httpResult(ErrorCode.kParamError));
    }
    if (RoomManager.instance().findRoom (roomId)) {
        return res.json (Utils.httpResult(ErrorCode.kInvalidOperation));
    }
    if (await RoomManager.instance().createRoom (roomId)) {
        return res.json (Utils.httpResult(ErrorCode.kSuccess));
    } else {
        return res.json (Utils.httpResult(ErrorCode.kServerError));
    }
});

indexRouter.post('/close_room', async (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const roomId = Utils.safeParseInt(req.body.room);
    if (!roomId) {
        return res.json (Utils.httpResult(ErrorCode.kParamError));
    }
    await RoomManager.instance().closeRoom (roomId);
    return res.json (Utils.httpResult(ErrorCode.kSuccess));
});

