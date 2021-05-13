"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const appResponse_1 = require("../utils/appResponse");
const validateBody = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = [];
        errors.array({ onlyFirstError: true }).map((err) => extractedErrors.push({ [err.param]: err.msg }));
        appResponse_1.sendFailureResponse(res, 422, extractedErrors);
        return;
    }
    return next();
};
exports.default = validateBody;
//# sourceMappingURL=validateBody.js.map