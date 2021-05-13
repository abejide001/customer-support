"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const months_1 = __importDefault(require("../../utils/months"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const appResponse_1 = require("../../utils/appResponse");
const generatePdf_1 = __importDefault(require("../../utils/generatePdf"));
const getLastMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const month = Number(req.params.month);
    let date = new Date();
    let currentMonth = date.getMonth();
    let previousMonth = new Date(date.setMonth(currentMonth - 1)).getMonth() + 1;
    try {
        if (month !== previousMonth) {
            appResponse_1.sendFailureResponse(res, 400, "Enter previous month");
            return;
        }
        const ticket = yield Ticket_1.default.aggregate([
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
        fs_1.default.writeFileSync("data.json", JSON.stringify(ticket));
        generatePdf_1.default();
        appResponse_1.sendSuccessResponse(res, 200, `Closed tickets for month of ${months_1.default[month - 1]}`, ticket);
    }
    catch (error) {
        console.log(error);
        appResponse_1.sendFailureResponse(res, 500, error);
        return;
    }
});
exports.default = getLastMonth;
//# sourceMappingURL=getLastMonth.js.map