import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from "cors";

import BookReviewRoute  from './routes/BookReviewRoute.js';

const app = express();
dotenv.config();
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Connection Successful!");
});

app.use("/reviews", BookReviewRoute);

mongoose
  .connect(process.env.MONGODB_URL)  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });