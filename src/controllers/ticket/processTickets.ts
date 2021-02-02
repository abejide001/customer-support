import { Response } from "express";
import Ticket from "../../models/Ticket";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../../utils/appResponse";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return the ticket for the agent to process
 */

const processTickets = async (_: any, res: Response) => {
  try {
    const tickets = await Ticket.find();
    sendSuccessResponse(res, 200, "Ticket fetched successfully", tickets);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default processTickets;
