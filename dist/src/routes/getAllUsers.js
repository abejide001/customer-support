"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRequired_1 = __importDefault(require("../middlewares/authRequired"));
const express_1 = __importDefault(require("express"));
const onlyAdminRoute_1 = __importDefault(require("../middlewares/onlyAdminRoute"));
const getAllUsers_1 = __importDefault(require("../controllers/user/getAllUsers"));
const router = express_1.default.Router();
exports.getAllUsersRouter = router;
router.get("/users", authRequired_1.default, onlyAdminRoute_1.default, getAllUsers_1.default);
//# sourceMappingURL=getAllUsers.js.map