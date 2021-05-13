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
const appResponse_1 = require("../utils/appResponse");
const Ticket_1 = __importDefault(require("../models/Ticket"));
const restrictCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketId = req.params.ticketId;
    if (!mongoose_1.default.Types.ObjectId.isValid(ticketId)) {
        appResponse_1.sendFailureResponse(res, 404, "Invalid id");
        return;
    }
    const checkTicketId = yield Ticket_1.default.findById(ticketId);
    if (!checkTicketId) {
        appResponse_1.sendFailureResponse(res, 404, "Ticket not found");
        return;
    }
    const tickets = yield Ticket_1.default.find({ _id: ticketId });
    if (req.user.role === "customer" && tickets[0].comments.length === 0) {
        appResponse_1.sendFailureResponse(res, 400, "Can't make a comment");
        return;
    }
    next();
});
exports.default = restrictCustomer;
//# sourceMappingURL=restrictCustomer.js.map