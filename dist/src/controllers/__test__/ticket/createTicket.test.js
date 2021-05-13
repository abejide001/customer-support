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
const Ticket_1 = __importDefault(require("../../../models/Ticket"));
it("returns 200 if the route exist", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default).post("/api/v1/tickets").send({});
    expect(response.status).not.toEqual(404);
}));
it("can only be accessed if the user is signed in", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default).post("/api/v1/tickets").send({}).expect(401);
}));
it("returns a status other than 401 if the user is signed in", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({});
    expect(response.status).not.toEqual(401);
}));
it("returns a 500 if the token is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer invalidtokenishereerejsbfjf`)
        .send({});
    expect(response.status).toEqual(500);
}));
it("returns 403 if it is not a customer that is trying to create a ticket", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.agentSignIn()}`)
        .send({});
    expect(response.status).toEqual(403);
}));
it("returns 422 if the description is less than 10", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({ description: "a" })
        .expect(422);
}));
it("creates a ticket with valid inputs", () => __awaiter(void 0, void 0, void 0, function* () {
    let tickets = yield Ticket_1.default.find({});
    expect(tickets.length).toEqual(0);
    const description = "I cant subscribe";
    yield supertest_1.default(app_1.default)
        .post("/api/v1/tickets")
        .set("Authorization", `Bearer ${global.customerSignIn()}`)
        .send({
        description,
    })
        .expect(201);
    tickets = yield Ticket_1.default.find({});
    expect(tickets[0].description).toEqual(description);
    expect(tickets[0].state).toEqual("pending");
}));
//# sourceMappingURL=createTicket.test.js.map