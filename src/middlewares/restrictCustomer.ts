import mongoose from "mongoose";
import { sendFailureResponse } from "../utils/appResponse";
import { Response, NextFunction } from "express";
import Ticket from "../models/Ticket";

const restrictCustomer = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const ticketId = req.params.ticketId;
  if (!mongoose.Types.ObjectId.isValid(ticketId)) {
    sendFailureResponse(res, 404, "Invalid id");
    return;
  }

  const checkTicketId = await Ticket.findById(ticketId);
  if (!checkTicketId) {
    sendFailureResponse(res, 404, "Ticket not found");
    return;
  }
  
  const tickets = await Ticket.find({ _id: ticketId });
  if (req.user.role === "customer" && tickets[0].comments!.length === 0) {
    sendFailureResponse(res, 400, "Can't make a comment");
    return;
  }
  next();
};

export default restrictCustomer;
