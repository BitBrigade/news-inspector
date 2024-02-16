import express from "express";
import { googleAuth, signin, signout, signup } from "../controllers/auth.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleAuth);
router.post("/signout", auth, signout);

export default router;
