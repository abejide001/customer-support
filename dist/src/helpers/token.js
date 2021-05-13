"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSign = (user) => {
    const { email, role, id } = user;
    const token = jsonwebtoken_1.default.sign({ id, role, email }, process.env.JWT_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
exports.default = jwtSign;
//# sourceMappingURL=token.js.map