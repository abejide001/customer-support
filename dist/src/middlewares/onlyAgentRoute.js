"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("../utils/appResponse");
const onlyAgentRoute = (req, res, next) => {
    if (req.user.role !== "agent") {
        appResponse_1.sendFailureResponse(res, 403, "Forbidden");
        return;
    }
    next();
};
exports.default = onlyAgentRoute;
//# sourceMappingURL=onlyAgentRoute.js.map