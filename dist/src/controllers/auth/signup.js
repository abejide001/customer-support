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
const User_1 = __importDefault(require("../../models/User"));
const appResponse_1 = require("../../utils/appResponse");
const token_1 = __importDefault(require("../../helpers/token"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email }).select("-__v");
        if (existingUser) {
            appResponse_1.sendFailureResponse(res, 409, "Email already exist");
            return;
        }
        const user = User_1.default.build({
            email,
            password,
        });
        yield user.save();
        const token = token_1.default(user);
        appResponse_1.sendSuccessResponse(res, 201, "User registered successfully", {
            user,
            token,
        });
    }
    catch (error) {
        appResponse_1.sendFailureResponse(res, 500, error.message);
    }
});
exports.default = signup;
//# sourceMappingURL=signup.js.map