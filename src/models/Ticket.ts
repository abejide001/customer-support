import mongoose from "mongoose";
import { commentSchema } from "./Comment";

interface TicketAttrs {
  title: string
  description: string;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string
  description: string;
  state?: string;
  userId?: string;
  comments: string[]
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
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
    comments: [commentSchema]
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

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

ticketSchema.pre("remove", function (next) {
  this.model("Comment").remove({ ticketId: this._id }, next);
  next();
});
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export default Ticket;
