import { Request, Response } from "express";
import Ticket from "../../models/Ticket";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../../utils/appResponse";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Returns edited ticket
 */

const updateTicket = async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  try {
    if (!ticket) {
      sendFailureResponse(res, 404, "ticket not found");
      return;
    }

    ticket?.set({
      state: req.body.state,
    });
    await ticket?.save();
    sendSuccessResponse(res, 200, "Ticket state updated", ticket);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default updateTicket;
