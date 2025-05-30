import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import commentRouter from "./routes/comment.route";
import replyRouter from "./routes/reply.route";
import { errorHandler } from "./middleware/error";
import ErrorHandler from "./utils/errorHandler";
import env from "./utils/env";

const PORT = env.PORT;

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/replies", replyRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//undefined route
app.all("*all", (req: Request, res: Response, next: NextFunction) => {
  const err = new ErrorHandler(
    "Route not found. Invalid endpoint or wrong API version.",
    500
  );
  return next(err);
});

app.use(errorHandler);
