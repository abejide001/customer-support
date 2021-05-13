import express from "express"
import authRequired from "../middlewares/authRequired"
import createTicket from "../controllers/ticket/createTicket"
import updateTicket from "../controllers/ticket/editTicket"
import onlyAgentRoute from "../middlewares/onlyAgentRoute"
import getAllTickets from "../controllers/ticket/getAllTickets"
import onlyCustomerRoute from "../middlewares/onlyCustomerRoute"
import processTickets from "../controllers/ticket/processTickets"
import getLastMonth from "../controllers/ticket/getLastMonth"
import validateBody from "../middlewares/validateBody";
import ticketValidationRules from "../middlewares/validateTicketRequestBody"
import hasRole from "../middlewares/hasRole"

const router = express.Router()

router.patch("/process/:id", authRequired, onlyAgentRoute, updateTicket)
router.get("/process", authRequired, hasRole(['agent', 'admin']), processTickets)
router.post("/",authRequired, onlyCustomerRoute, ticketValidationRules(), validateBody, createTicket)
router.get("/", authRequired, onlyCustomerRoute, getAllTickets)
router.get("/:month", authRequired, onlyAgentRoute, getLastMonth)

export { router as ticketRouter }