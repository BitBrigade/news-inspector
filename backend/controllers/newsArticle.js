import mongoose from "mongoose";
import NewsArticle from "../models/newsArticle.js";

export const createNewsArticle = async (req, res) => {
  try {
    const { url, content, result, creator } = req.body;
    const isCreatorValid = mongoose.Types.ObjectId.isValid(creator);

    if (!url) {
      return res.status(400).json({ message: "Invalid article url" });
    }

    if (!isCreatorValid) {
      return res.status(400).json({ message: "Invalid creator" });
    }

    const newsArticle = new NewsArticle({
      url,
      content,
      result,
      creator,
    });

    const createdNewsArticle = await newsArticle.save();

    res.status(200).json(createdNewsArticle);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const getNewsArticle = async (req, res) => {
  try {
    const newsArticles = await NewsArticle.find().populate("creator");

    res.status(200).json(newsArticles);
  } catch (error) {
    res.status(200).json({ message: "Internal server error!" });
  }
};

export const deleteNewsArticle = async (req, res) => {
  try {
    const newsArticleId = req.params.id;

    const result = await NewsArticle.findByIdAndDelete(newsArticleId);

    if (result) {
      res.status(200).json({ message: "News Article deleted successfully!" });
    } else {
      res.status(404).json({ message: "News Article not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};
