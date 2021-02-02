import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express"

const { sendFailureResponse } = require("../utils/appResponse");

const authRequired = async (req: any, res: Response, next: NextFunction) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return sendFailureResponse(res, 401, "Provide a token abeg");

    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    req.user = decoded;
  } catch (error) {
    return sendFailureResponse(res, 500, error.message);
  }
  next();
};

export default authRequired;
