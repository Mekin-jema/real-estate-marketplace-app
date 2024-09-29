import express from "express";
import dotentv from "dotenv";
import mongoose, { mongo } from "mongoose";
dotentv.config();

const PORT = process.env.PORT;
const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("Server is running on post ", PORT);
});
