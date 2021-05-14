import express from "express";
import signin from "../controllers/auth/signin";
import signup from "../controllers/auth/signup";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

export { router as authRouter };
