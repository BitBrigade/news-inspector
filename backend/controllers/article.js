import mongoose from "mongoose";
import Article from "../models/article.js";

export const createArticle = async (req, res) => {
  try {
    const { url, content, result, creator } = req.body;
    const isCreatorValid = mongoose.Types.ObjectId.isValid(creator);

    if (!url) {
      return res.status(400).json({ message: "Invalid article url" });
    }

    if (!isCreatorValid) {
      return res.status(400).json({ message: "Invalid creator" });
    }

    const article = new Article({
      url,
      content,
      result,
      creator,
    });

    const createdArticle = await article.save();

    res.status(200).json(createdArticle);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("creator");

    res.status(200).json(articles);
  } catch (error) {
    res.status(200).json({ message: "Internal server error!" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const articleId = req.params.id;

    const result = await Article.findByIdAndDelete(articleId);

    if (result) {
      res.status(200).json({ message: "Article deleted successfully!" });
    } else {
      res.status(404).json({ message: "Article not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
