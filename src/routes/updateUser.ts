import authRequired from '../middlewares/authRequired';
import express from "express"
import updateUser from "../controllers/user/updateUser"
import onlyAdminRoute from '../middlewares/onlyAdminRoute';

const router = express.Router()

router.patch("/users/:id", authRequired, onlyAdminRoute, updateUser)

export { router as updateRouter }