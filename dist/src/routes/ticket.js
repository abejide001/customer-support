"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRequired_1 = __importDefault(require("../middlewares/authRequired"));
const createTicket_1 = __importDefault(require("../controllers/ticket/createTicket"));
const editTicket_1 = __importDefault(require("../controllers/ticket/editTicket"));
const onlyAgentRoute_1 = __importDefault(require("../middlewares/onlyAgentRoute"));
const getAllTickets_1 = __importDefault(require("../controllers/ticket/getAllTickets"));
const onlyCustomerRoute_1 = __importDefault(require("../middlewares/onlyCustomerRoute"));
const processTickets_1 = __importDefault(require("../controllers/ticket/processTickets"));
const getLastMonth_1 = __importDefault(require("../controllers/ticket/getLastMonth"));
const validateBody_1 = __importDefault(require("../middlewares/validateBody"));
const validateTicketRequestBody_1 = __importDefault(require("../middlewares/validateTicketRequestBody"));
const hasRole_1 = __importDefault(require("../middlewares/hasRole"));
const router = express_1.default.Router();
exports.ticketRouter = router;
router.patch("/process/:id", authRequired_1.default, onlyAgentRoute_1.default, editTicket_1.default);
router.get("/process", authRequired_1.default, hasRole_1.default(['agent', 'admin']), processTickets_1.default);
router.post("/", authRequired_1.default, onlyCustomerRoute_1.default, validateTicketRequestBody_1.default(), validateBody_1.default, createTicket_1.default);
router.get("/", authRequired_1.default, onlyCustomerRoute_1.default, getAllTickets_1.default);
router.get("/:month", authRequired_1.default, onlyAgentRoute_1.default, getLastMonth_1.default);
//# sourceMappingURL=ticket.js.map