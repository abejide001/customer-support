"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRequired_1 = __importDefault(require("../middlewares/authRequired"));
const createComment_1 = __importDefault(require("../controllers/comment/createComment"));
const restrictCustomer_1 = __importDefault(require("../middlewares/restrictCustomer"));
const router = express_1.default.Router();
exports.commentsRoute = router;
router.post("/:ticketId", authRequired_1.default, restrictCustomer_1.default, createComment_1.default);
//# sourceMappingURL=comment.js.map