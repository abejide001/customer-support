"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendSuccessResponse = (res, code, message, data) => {
    return res.status(code).json({
        status: "success",
        message,
        data,
    });
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendFailureResponse = (res, code, data) => {
    return res.status(code).json({
        status: "fail",
        error: data,
    });
};
exports.sendFailureResponse = sendFailureResponse;
//# sourceMappingURL=appResponse.js.map