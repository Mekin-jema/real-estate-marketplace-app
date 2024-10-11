import express from "express";
import dotentv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotentv.config();

const PORT = process.env.PORT;

const __dirname = path.resolve();
const app = express();

app.use(express.json());
// app.use(cors);
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
//middleware for error handling

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectDB(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
  });
});
