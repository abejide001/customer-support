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
it("returns 404 if the ticket does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    const ticketId = mongoose_1.default.Types.ObjectId().toHexString();
    const response = yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${ticketId}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        comment: "this is",
    });
    expect(response.status).toEqual(404);
}));
it("returns 404 if the id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${20}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        comment: "this is",
    });
    expect(response.status).toEqual(404);
}));
it("returns a 400 if customer tries to comment first", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "I cant recharge" });
    yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({
        comment: "this is still open",
    })
        .expect(400);
}));
it("returns a 201 if the agent comments first", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "I cant recharge" });
    yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        comment: "I am working on this",
    })
        .expect(201);
}));
it("returns a 201 if the customer tries to comment after the agent has commented", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "I cant recharge" });
    yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({
        comment: "I am working on this",
    });
    yield supertest_1.default(app_1.default)
        .post(`/api/v1/comments/${response.body.data.id}`)
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({
        comment: "Please make this faster",
    })
        .expect(201);
}));
//# sourceMappingURL=createComments.test.js.map