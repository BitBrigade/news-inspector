import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3000;

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import articleRotuer from "./routes/article.js";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	cors({
		origin: [
			"http://localhost:4321",
			"https://news-inspector.vercel.app",
			"https://news-inspector-cb555.firebaseapp.com",
		],
		credentials: true,
	}),
);
app.use(cookieParser());

app.use("/api", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/article", articleRotuer);

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
