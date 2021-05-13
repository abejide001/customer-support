"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("../utils/appResponse");
const validAuthOperation = (req, res, next) => {
    const params = Object.keys(req.body);
    const allowedMethods = ["email", "password"];
    const isValidOperation = params.every((param) => allowedMethods.includes(param));
    if (!isValidOperation) {
        appResponse_1.sendFailureResponse(res, 400, `Invalid operation, enter email and password`);
    }
    next();
};
exports.default = validAuthOperation;
//# sourceMappingURL=validateAuthOperation.js.map