import { Request, Response } from "express";
import User from "../../models/User";
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
 * @return {Object} Return success message and the updated user
 */

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      sendFailureResponse(res, 404, "User not found");
      return
    }
  
    user.set({
      role: req.body.state,
    });
    await user.save();
    sendSuccessResponse(res, 200, "User role updated", user);
  } catch (error) {
    sendFailureResponse(res, 500, error.message)
  }
};

export default updateUser;
