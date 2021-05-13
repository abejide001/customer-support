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
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const appResponse_1 = require("../../utils/appResponse");
const processTickets = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tickets = yield Ticket_1.default.find();
        appResponse_1.sendSuccessResponse(res, 200, "Ticket fetched successfully", tickets);
    }
    catch (error) {
        appResponse_1.sendFailureResponse(res, 500, error.message);
    }
});
exports.default = processTickets;
//# sourceMappingURL=processTickets.js.map