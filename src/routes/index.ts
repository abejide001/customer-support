import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../docs/swagger.json"
import { ticketRouter } from "./ticket"
import { updateRouter } from "./updateUser"
import { getAllUsersRouter } from "./getAllUsers"
import { commentsRoute } from "./comment"
import { authRouter } from "./auth"

const routes = () => {
  const router = express.Router()
  router.use("/auth", authRouter)
  router.use(updateRouter)
  router.use(getAllUsersRouter)
  router.use("/tickets", ticketRouter)
  router.use("/comments", commentsRoute)
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  return router
}

export default routes;
