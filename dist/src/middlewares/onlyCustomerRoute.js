"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appResponse_1 = require("../utils/appResponse");
const onlyCustomerRoute = (req, res, next) => {
    if (req.user.role !== "customer") {
        appResponse_1.sendFailureResponse(res, 403, "Forbidden");
        return;
    }
    next();
};
exports.default = onlyCustomerRoute;
//# sourceMappingURL=onlyCustomerRoute.js.map