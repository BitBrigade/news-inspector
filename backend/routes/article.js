import express from "express";

import {
  createArticle,
  getArticles,
  deleteArticle,
} from "../controllers/article.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getArticles);
router.post("/", auth, createArticle);
router.delete("/:id", auth, deleteArticle);

export default router;
