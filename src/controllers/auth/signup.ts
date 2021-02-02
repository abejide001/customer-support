import { Request, Response } from "express";
import User from "../../models/User";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../../utils/appResponse";
import jwtSign from "../../helpers/token";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Return registered user
 */

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }).select("-__v")
    if (existingUser) {
      sendFailureResponse(res, 409, "Email already exist");
      return;
    }
    const user = User.build({
      email,
      password,
    });
    await user.save();
    const token = jwtSign(user);
    sendSuccessResponse(res, 201, "User registered successfully", {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default signup;
