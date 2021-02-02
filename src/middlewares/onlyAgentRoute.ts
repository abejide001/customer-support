import { NextFunction, Response } from "express";
import { sendFailureResponse } from "../utils/appResponse";

const onlyAgentRoute = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "agent") {
    sendFailureResponse(res, 403, "Forbidden");
    return;
  }
  next();
};

export default onlyAgentRoute;
