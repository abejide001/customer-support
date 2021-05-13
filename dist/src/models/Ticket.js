"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Comment_1 = require("./Comment");
const ticketSchema = new mongoose_1.default.Schema({
    description: {
        type: String,
        required: true,
        unique: true,
    },
    state: {
        type: String,
        default: "pending",
        enum: ["pending", "in-review", "closed"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    userId: {
        type: String,
    },
    comments: [Comment_1.commentSchema]
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
ticketSchema.statics.build = (attrs) => {
    return new Ticket(attrs);
};
ticketSchema.pre("remove", function (next) {
    this.model("Comment").remove({ ticketId: this._id }, next);
    next();
});
const Ticket = mongoose_1.default.model("Ticket", ticketSchema);
exports.default = Ticket;
//# sourceMappingURL=Ticket.js.map