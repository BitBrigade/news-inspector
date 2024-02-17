import mongoose from "mongoose";

const newsArticleSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },

    content: { type: String, required: true },

    result: { type: Object, required: true },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const NewsArticle = mongoose.model("NewsArticle", newsArticleSchema);

export default NewsArticle;
