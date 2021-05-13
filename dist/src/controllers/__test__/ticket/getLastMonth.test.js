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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../../app"));
it("returns a 400 if the month is not a previous month", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .get(`/api/v1/tickets/${12}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send();
    expect(response.status).toEqual(400);
}));
it("returns 200 if it is a previous month", () => __awaiter(void 0, void 0, void 0, function* () {
    let date = new Date();
    let currentMonth = date.getMonth();
    let previousMonth = new Date(date.setMonth(currentMonth - 1)).getMonth() + 1;
    const response = yield supertest_1.default(app_1.default)
        .get(`/api/v1/tickets/${previousMonth}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send();
    expect(response.status).toEqual(200);
}));
//# sourceMappingURL=getLastMonth.test.js.map