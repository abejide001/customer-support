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
it("returns a 201 on successful signup", () => __awaiter(void 0, void 0, void 0, function* () {
    return supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "sdfsfsg",
    })
        .expect(201);
}));
it("returns 422 if there is no input", () => __awaiter(void 0, void 0, void 0, function* () {
    return supertest_1.default(app_1.default).post("/api/v1/auth/signup").send({}).expect(422);
}));
it("returns 422 with an invalid password", () => __awaiter(void 0, void 0, void 0, function* () {
    return supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "s",
    })
        .expect(422);
}));
it("returns 422 with an invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
    return supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test",
        password: "ssss",
    })
        .expect(422);
}));
it("disallows duplicated email", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "sfsss",
    })
        .expect(201);
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "sfsss",
    })
        .expect(409);
}));
//# sourceMappingURL=signup.test.js.map