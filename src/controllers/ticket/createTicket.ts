import { Response } from "express";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../../utils/appResponse";
import Ticket from "../../models/Ticket";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return created ticket
 */

const createTicket = async (req: any, res: Response) => {
  try {
    const { description, title } = req.body;
    const ticket = Ticket.build({
      title,
      description,
      userId: req.user.id,
    });
    await ticket.save();
    sendSuccessResponse(res, 201, "Ticket created successfully", ticket);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default createTicket;
