import express from "express"
import authRequired from "../middlewares/authRequired";
import createComment from "../controllers/comment/createComment";
import restrictCustomer from "../middlewares/restrictCustomer";

const router = express.Router()

router.post("/:ticketId", authRequired, restrictCustomer, createComment)

export { router as commentsRoute }