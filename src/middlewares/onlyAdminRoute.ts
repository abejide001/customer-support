import { Response, NextFunction } from "express";
import { sendFailureResponse } from "../utils/appResponse";

const onlyAdminRoute = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "admin") {
    sendFailureResponse(res, 403, "Forbidden");
    return;
  }
  next();
};

export default onlyAdminRoute;
