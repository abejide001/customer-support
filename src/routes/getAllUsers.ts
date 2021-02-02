import authRequired from '../middlewares/authRequired';
import express from "express"
import onlyAdminRoute from '../middlewares/onlyAdminRoute';
import allUsers from '../controllers/user/getAllUsers';

const router = express.Router()

router.get("/users", authRequired, onlyAdminRoute, allUsers)

export { router as getAllUsersRouter }