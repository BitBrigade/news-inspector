import express from "express";
import { updateUser, deleteUser } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
