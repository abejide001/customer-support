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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const User_1 = __importDefault(require("../models/User"));
const users_json_1 = __importDefault(require("../data/users.json"));
require("../config/databaseConfig");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Promise.all([User_1.default.insertMany(users_json_1.default)]);
        console.log("data seeded");
        process.exit(0);
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}))();
//# sourceMappingURL=index.js.map