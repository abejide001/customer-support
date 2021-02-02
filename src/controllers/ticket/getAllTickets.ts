import { Response } from "express";
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
 * @return {Object} Returns all ticket
 */

const getAllTickets = async (req: any, res: Response): Promise<void> => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id })
    sendSuccessResponse(res, 200, "Ticket fetched successfully", tickets);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default getAllTickets;
