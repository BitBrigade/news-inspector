import express from "express";

import {
  createNewsArticle,
  getNewsArticle,
  deleteNewsArticle,
} from "../controllers/newsArticle.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getNewsArticle);
router.post("/", auth, createNewsArticle);
router.delete("/:id", auth, deleteNewsArticle);

export default router;
