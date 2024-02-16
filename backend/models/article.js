import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },

    content: { type: String, required: true },

    result: { type: Number, required: true },

    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
