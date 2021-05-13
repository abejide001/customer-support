import fs from "fs";
import { Response, Request } from "express";
import months from "../../utils/months";
import Ticket from "../../models/Ticket";
import {
  sendSuccessResponse,
  sendFailureResponse,
} from "../../utils/appResponse";
import exportToPdf from "../../utils/generatePdf";

/**
 * @param {Object} req - HTTP request object
 *
 * @param {Object} res - HTTP response object
 *
 * @param {Function} next - Function to trigger next middleware
 *
 * @return {Object} Returns the ticket for the previous month
 */

const getLastMonth = async (req: Request, res: Response) => {
  const month = Number(req.params.month);
  let date = new Date();
  let currentMonth = date.getMonth();
  let previousMonth = new Date(date.setMonth(currentMonth - 1)).getMonth() + 1;
  try {
    if (month !== previousMonth) {
      sendFailureResponse(res, 400, "Enter previous month");
      return;
    }
    const ticket = await Ticket.aggregate([
      {
        $match: {
          state: { $eq: "closed" },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
          state: "$state",
          description: "$description",
        },
      },
      {
        $match: {
          month,
        },
      },
    ]);
    fs.writeFileSync("data.json", JSON.stringify(ticket));
    exportToPdf()
    sendSuccessResponse(
      res,
      200,
      `Closed tickets for month of ${months[month - 1]}`,
      ticket
    );
  } catch (error) {
    console.log(error);
    sendFailureResponse(res, 500, error);
    return;
  }
};

export default getLastMonth;
