import authRequired from "../middlewares/authRequired";
import express from "express";
import updateUser from "../controllers/user/updateUser";
import allUsers from "../controllers/user/getAllUsers";
import onlyAdminRoute from "../middlewares/onlyAdminRoute";

const router = express.Router();

router.patch("/:id", authRequired, onlyAdminRoute, updateUser);
router.get("/", authRequired, onlyAdminRoute, allUsers);

export { router as userRouter };
