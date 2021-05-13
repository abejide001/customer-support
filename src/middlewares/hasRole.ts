import { Response, NextFunction } from "express";
import { sendFailureResponse } from "../utils/appResponse";

export default function hasRole(roles: String[]) {
  return function (req: any, res: Response, next: NextFunction): any {
    if (!roles.includes(req.user.role)) {
      sendFailureResponse(res, 403, "Forbidden");
      return
    }
    next();
  };
}
