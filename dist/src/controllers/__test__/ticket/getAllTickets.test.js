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
const createTicket = () => {
    return supertest_1.default(app_1.default)
        .post("/api/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "Cant make orders" });
};
it("can fetch a list of ticket", () => __awaiter(void 0, void 0, void 0, function* () {
    yield createTicket();
    yield createTicket();
    yield createTicket();
    const response = yield supertest_1.default(app_1.default)
        .get("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`);
    expect(response.body.message).toEqual("Ticket fetched successfully");
}));
it("returns a 401 if user is not authenticated", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .get("/api/v1/tickets");
    expect(response.status).toEqual(401);
}));
//# sourceMappingURL=getAllTickets.test.js.map