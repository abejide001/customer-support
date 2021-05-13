"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
const ticket_1 = require("./ticket");
const comment_1 = require("./comment");
const auth_1 = require("./auth");
const user_1 = require("./user");
const routes = () => {
    const router = express_1.default.Router();
    router.use("/auth", auth_1.authRouter);
    router.use("/users", user_1.userRouter);
    router.use("/tickets", ticket_1.ticketRouter);
    router.use("/comments", comment_1.commentsRoute);
    router.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    return router;
};
exports.default = routes;
//# sourceMappingURL=index.js.map