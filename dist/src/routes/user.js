"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRequired_1 = __importDefault(require("../middlewares/authRequired"));
const express_1 = __importDefault(require("express"));
const updateUser_1 = __importDefault(require("../controllers/user/updateUser"));
const getAllUsers_1 = __importDefault(require("../controllers/user/getAllUsers"));
const onlyAdminRoute_1 = __importDefault(require("../middlewares/onlyAdminRoute"));
const router = express_1.default.Router();
exports.userRouter = router;
router.patch("/:id", authRequired_1.default, onlyAdminRoute_1.default, updateUser_1.default);
router.get("/", authRequired_1.default, onlyAdminRoute_1.default, getAllUsers_1.default);
//# sourceMappingURL=user.js.map