"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateAuthRequestBody_1 = require("../middlewares/validateAuthRequestBody");
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const signin_1 = __importDefault(require("../controllers/auth/signin"));
const signup_1 = __importDefault(require("../controllers/auth/signup"));
const validateAuthOperation_1 = __importDefault(require("../middlewares/validateAuthOperation"));
const router = express_1.default.Router();
exports.authRouter = router;
router.post("/signin", validateAuthRequestBody_1.userValidationRules(), validateBody_1.default, validateAuthOperation_1.default, signin_1.default);
router.post("/signup", validateAuthRequestBody_1.userValidationRules(), validateBody_1.default, signup_1.default);
//# sourceMappingURL=auth.js.map