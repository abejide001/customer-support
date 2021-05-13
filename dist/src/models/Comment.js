"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.commentSchema = new mongoose_1.default.Schema({
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: {
        transform(_, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
});
exports.commentSchema.statics.build = (attrs) => {
    return new Comment(attrs);
};
const Comment = mongoose_1.default.model("Comment", exports.commentSchema);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map