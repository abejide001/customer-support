"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Password_1 = require("../../utils/Password");
const User_1 = __importDefault(require("../../models/User"));
const appResponse_1 = require("../../utils/appResponse");
const token_1 = __importDefault(require("../../helpers/token"));
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.find({ email }).select("-__v");
        if (user.length === 0) {
            appResponse_1.sendFailureResponse(res, 401, "Incorrect email or password");
            return;
        }
        const passwordMatch = yield Password_1.Password.compare(user[0].password, password);
        if (!passwordMatch) {
            appResponse_1.sendFailureResponse(res, 401, "Incorrect email or password");
            return;
        }
        const token = token_1.default({
            id: user[0].id,
            role: user[0].role,
            email: user[0].email,
        });
        appResponse_1.sendSuccessResponse(res, 200, "User logged in successfully", {
            user,
            token,
        });
    }
    catch (error) {
        appResponse_1.sendFailureResponse(res, 500, error.message);
    }
});
exports.default = signin;
//# sourceMappingURL=signin.js.map