import express from "express";
import { userValidationRules } from "../middlewares/validateAuthRequestBody";
import validateBody from "../middlewares/validateBody";
import signin from "../controllers/auth/signin";
import signup from "../controllers/auth/signup";
import validAuthOperation from "../middlewares/validateAuthOperation";

const router = express.Router();

router.post("/signin", userValidationRules(), validateBody, validAuthOperation, signin);
router.post("/signup", userValidationRules(), validateBody, signup);

export { router as authRouter };
