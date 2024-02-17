import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import articleRotuer from "./routes/newsArticle.js";

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://news-inspector-82443.firebaseapp.com",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/newsArticle", articleRotuer);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  });
