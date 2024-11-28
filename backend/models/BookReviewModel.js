import mongoose from "mongoose";

const bookReviewSchema = new mongoose.Schema(
    {
    bookTitle: {
      type: String,
      required: true,
    },
    bookAuthor: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const BookReview = mongoose.model("BookReview", bookReviewSchema);