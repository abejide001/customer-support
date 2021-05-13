"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRequired_1 = __importDefault(require("../middlewares/authRequired"));
const express_1 = __importDefault(require("express"));
const updateUser_1 = __importDefault(require("../controllers/user/updateUser"));
const onlyAdminRoute_1 = __importDefault(require("../middlewares/onlyAdminRoute"));
const router = express_1.default.Router();
exports.updateRouter = router;
router.patch("/users/:id", authRequired_1.default, onlyAdminRoute_1.default, updateUser_1.default);
//# sourceMappingURL=updateUser.js.map