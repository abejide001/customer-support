import { Request, Response } from "express";
import User from "../../models/User";
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
 * @return {Object} Returns all users
 */

const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    sendSuccessResponse(res, 200, "User fetched successfully", users);
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default getAllUsers;
