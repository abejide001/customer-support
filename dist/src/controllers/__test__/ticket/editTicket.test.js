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
it("returns a 401 if user is not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = mongoose_1.default.Types.ObjectId().toHexString();
    yield supertest_1.default(app_1.default)
        .patch(`/api/v1/tickets/process/${id}`)
        .send({
        state: "in-review",
    })
        .expect(401);
}));
it("returns a 403 if the user is not an agent", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = mongoose_1.default.Types.ObjectId().toHexString();
    yield supertest_1.default(app_1.default)
        .patch(`/api/v1/tickets/process/${id}`)
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({
        state: "in-review",
    })
        .expect(403);
}));
it("returns a 404 if the user is an agent and ticket does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    const id = mongoose_1.default.Types.ObjectId().toHexString();
    const response = yield supertest_1.default(app_1.default)
        .patch(`/api/v1/tickets/process/${id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        state: "in-review",
    });
    expect(response.status).toEqual(404);
}));
it("returns a 500 if it is not a valid state", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "I cant recharge" });
    yield supertest_1.default(app_1.default)
        .patch(`/api/v1/tickets/process/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        state: "hmmm",
    })
        .expect(500);
}));
it("returns a 200 and updates the ticket if the ticket id is valid", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "I cant recharge" });
    yield supertest_1.default(app_1.default)
        .patch(`/api/v1/tickets/process/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        state: "in-review",
    })
        .expect(200);
}));
//# sourceMappingURL=editTicket.test.js.map