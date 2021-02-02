import { Request, Response, NextFunction } from "express";
import { validationResult} from "express-validator";
import { sendFailureResponse } from "../utils/appResponse";

const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: any = [];
    errors.array().map((err: any) => extractedErrors.push({ [err.param]: err.msg }));
    sendFailureResponse(res, 422, extractedErrors)
    return
  }
  return next();
};

export default validateBody