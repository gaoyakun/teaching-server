"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../common/utils");
const errcodes_1 = require("../../common/errcodes");
const express = require("express");
const router = express.Router();
router.get('/auth', (req, res, next) => {
    let session = req.session;
    if (session.loginUserId) {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kSuccess));
    }
    else {
        res.json(utils_1.Utils.httpResult(errcodes_1.ErrorCode.kAuthError));
    }
});
module.exports = router;
//# sourceMappingURL=api.js.map