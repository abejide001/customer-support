"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("../utils/appResponse");
const onlyAdminRoute = (req, res, next) => {
    if (req.user.role !== "admin") {
        appResponse_1.sendFailureResponse(res, 403, "Forbidden");
        return;
    }
    next();
};
exports.default = onlyAdminRoute;
//# sourceMappingURL=onlyAdminRoute.js.map