"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("../utils/appResponse");
function hasRole(roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            appResponse_1.sendFailureResponse(res, 403, "Forbidden");
            return;
        }
        next();
    };
}
exports.default = hasRole;
//# sourceMappingURL=hasRole.js.map