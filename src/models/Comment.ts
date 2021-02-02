import mongoose from "mongoose";

interface CommentAttrs {
  comment: string;
  userId: string;
}

interface CommentDoc extends mongoose.Document {
  comment: string;
  userId?: string;
}

interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc | any;
}

export const commentSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

commentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>("Comment", commentSchema);

export default Comment;
