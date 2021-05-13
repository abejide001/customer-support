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
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../../app"));
it("returns a 404 if the ticket id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = mongoose_1.default.Types.ObjectId().toHexString();
    const response = yield supertest_1.default(app_1.default)
        .get(`/api/v1/comments/${id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`);
    expect(response.status).toEqual(404);
}));
//# sourceMappingURL=getComments.test.js.map