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
const appResponse_1 = require("../../utils/appResponse");
const Comment_1 = __importDefault(require("../../models/Comment"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId } = req.params;
        const { comment } = req.body;
        const ticket = yield Ticket_1.default.findById(ticketId);
        const createComment = Comment_1.default.build({
            comment,
            userId: req.user.id
        });
        yield ticket.comments.push(createComment);
        yield ticket.save();
        appResponse_1.sendSuccessResponse(res, 201, "Comment created successfully", createComment);
    }
    catch (error) {
        appResponse_1.sendFailureResponse(res, 500, error.message);
    }
});
exports.default = createComment;
//# sourceMappingURL=createComment.js.map