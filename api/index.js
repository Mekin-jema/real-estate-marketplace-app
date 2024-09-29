import express from "express";
import dotentv from "dotenv";
import { connectDB } from "./database/connectDB.js";
import userRouter from "./routes/user.route.js";
dotentv.config();

const PORT = process.env.PORT;
const app = express();

app.use(userRouter);

connectDB(() => {
  app.listen(PORT, () => {
    console.log("Server is running on post ", PORT);
  });
});
