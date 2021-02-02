import { sendFailureResponse } from "../utils/appResponse";
import { Response, NextFunction } from "express";

const onlyCustomerRoute = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "customer") {
    sendFailureResponse(res, 403, "Forbidden");
    return;
  }
  next();
};

export default onlyCustomerRoute;
