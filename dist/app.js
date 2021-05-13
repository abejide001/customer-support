"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./src/routes"));
const appResponse_1 = require("./src/utils/appResponse");
dotenv_1.default.config();
const app = express_1.default();
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_mongo_sanitize_1.default());
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use(express_1.urlencoded({ extended: false }));
app.use("/api/v1/", routes_1.default());
app.get("/api/v1", (_, res) => {
    res.status(200).json({
        message: `Welcome to v1 of customer support, visit the docs - ${"https://customer-support-2021.herokuapp.com/api/v1/docs"}`
    });
});
app.all("*", (_, res) => {
    appResponse_1.sendFailureResponse(res, 404, "Route not found");
});
exports.default = app;
//# sourceMappingURL=app.js.map