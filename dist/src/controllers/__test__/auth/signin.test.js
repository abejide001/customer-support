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
it("fails when the account does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "test@gmail.com",
        password: "asff",
    })
        .expect(401);
}));
it("should return 422 if there is no input", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({})
        .expect(422);
}));
it("should return 422 when an invalid email is provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "abab",
        password: "abcde"
    })
        .expect(422);
}));
it("should return 422 when password is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "abab@gmail.com",
        password: ""
    })
        .expect(422);
}));
it("should return 422 when password is less than 4", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "abab@gmail.com",
        password: "ba"
    })
        .expect(422);
}));
it("fails when an incorrect password is supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "sdfsfsg",
    })
        .expect(201);
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "test@gmail.com",
        password: "sdfssf",
    })
        .expect(401);
}));
it("fails when an incorrect mail is supplied", () => __awaiter(void 0, void 0, void 0, function* () {
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signup")
        .send({
        email: "test@gmail.com",
        password: "sdfsfsg",
    })
        .expect(201);
    yield supertest_1.default(app_1.default)
        .post("/api/v1/auth/signin")
        .send({
        email: "tes@gmail.com",
        password: "sdfssf",
    })
        .expect(401);
}));
//# sourceMappingURL=signin.test.js.map