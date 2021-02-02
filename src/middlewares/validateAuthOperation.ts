import { Response, Request, NextFunction } from 'express';
import { sendFailureResponse } from "../utils/appResponse";

const validAuthOperation = (req: Request, res: Response, next: NextFunction) => {
  const params = Object.keys(req.body); // req.body is coming from API
  const allowedMethods = ["email", "password"];
  const isValidOperation = params.every((param) =>
    allowedMethods.includes(param)
  );

  if (!isValidOperation) {
    sendFailureResponse(res, 400, `Invalid operation, enter email and password`)
  }
  next()
};

export default validAuthOperation