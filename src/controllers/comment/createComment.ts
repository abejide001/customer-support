import { Response } from "express";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../../utils/appResponse";
import Comment from "../../models/Comment";
import Ticket from "../../models/Ticket";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return created comment
 */

const createComment = async (req: any, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { comment } = req.body;
    const ticket = await Ticket.findById(ticketId);
    const createComment = Comment.build({
      comment,
      userId: req.user.id,
    });
    await ticket!.comments!.push(createComment);
    await ticket!.save();
    sendSuccessResponse(
      res,
      201,
      "Comment created successfully",
      createComment
    );
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default createComment;
