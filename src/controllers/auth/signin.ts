import { Password } from "../../utils/Password";
import { Request } from "express";
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
 * @return {Object} Return success message and logged in user
 */
const signin = async (req: Request, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email }).select("-__v")
    if (user.length === 0) {
      sendFailureResponse(res, 401, "Incorrect email or password");
      return;
    }

    const passwordMatch = await Password.compare(user[0].password, password);

    if (!passwordMatch) {
      sendFailureResponse(res, 401, "Incorrect email or password");
      return;
    }
    const token = jwtSign({
      id: user[0].id,
      role: user[0].role,
      email: user[0].email,
    });

    sendSuccessResponse(res, 200, "User logged in successfully", {
      user,
      token,
    });
  } catch (error) {
    sendFailureResponse(res, 500, error.message);
  }
};

export default signin;
