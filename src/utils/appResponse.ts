import { Response } from "express"

const sendSuccessResponse = (res: Response, code: number, message: any, data: any) => {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
};

const sendFailureResponse = (res: Response, code: number, data:any) => {
  return res.status(code).json({
    status: "fail",
    error: data,
  });
};

export {
  sendFailureResponse,
  sendSuccessResponse
}