import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

const AddReview = ({ onClose, onAdd }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState({
    bookName: "",
    author: "",
    rating: "",
    review: "",
  });

  // Validation functions
  const validatebookName = () => {
    if (!bookName.trim()) {
      setErrors((prev) => ({ ...prev, bookName: "Book name is required" }));
      return false;
    }
    if (bookName.length > 100) {
      setErrors((prev) => ({
        ...prev,
        bookName: "Book name must be less than 100 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, bookName: "" }));
    return true;
  };

  const validateAuthor = () => {
    if (!author.trim()) {
      setErrors((prev) => ({ ...prev, author: "Author name is required" }));
      return false;
    }
    if (author.length > 50) {
      setErrors((prev) => ({
        ...prev,
        author: "Author name must be less than 50 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, author: "" }));
    return true;
  };

  const validateRating = () => {
    const ratingNum = Number(rating);
    if (rating === "" || isNaN(ratingNum) || ratingNum < 0 || ratingNum > 5) {
      setErrors((prev) => ({ ...prev, rating: "Rating must be between 0 and 5" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, rating: "" }));
    return true;
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    setRating(value);
    // Immediate validation on change
    const numValue = Number(value);
    if (value === "" || isNaN(numValue) || numValue < 0 || numValue > 5) {
      setErrors((prev) => ({ ...prev, rating: "Rating must be between 0 and 5" }));
    } else {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const validateReview = () => {
    if (!review.trim()) {
      setErrors((prev) => ({ ...prev, review: "Review is required" }));
      return false;
    }
    if (review.length < 10) {
      setErrors((prev) => ({
        ...prev,
        review: "Review must be at least 10 characters",
      }));
      return false;
    }
    if (review.length > 500) {
      setErrors((prev) => ({
        ...prev,
        review: "Review must be less than 500 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, review: "" }));
    return true;
  };

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();

    const isbookNameValid = validatebookName();
    const isAuthorValid = validateAuthor();
    const isRatingValid = validateRating();
    const isReviewValid = validateReview();

    if (isbookNameValid && isAuthorValid && isRatingValid && isReviewValid) {
      const newReview = {
        bookTitle: bookName,
        bookAuthor: author,
        review: review,
        rating: Number(rating),
      };
      axios
        .post("http://localhost:3000/reviews", newReview)
        .then(() => {
          onAdd();
          onClose();
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-lg bg-white rounded-xl p-6 shadow-xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-gray-800 text-2xl sm:text-3xl mb-6 font-bold text-center">
          Add Review
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Book Name:</label>
            <input
              className={`h-11 p-2 border-2 rounded-md shadow-sm ${
                errors.bookName ? "border-red-500" : "border-gray-200"
              }`}
              type="text"
              id="name"
              value={bookName}
              name="name"
              onChange={(e) => setBookName(e.target.value)}
              onBlur={validatebookName}
            />
            {errors.bookName && (
              <span className="text-red-500 text-sm mt-1">{errors.bookName}</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Author:</label>
            <input
              className={`h-11 p-2 border-2 rounded-md shadow-sm ${
                errors.author ? "border-red-500" : "border-gray-200"
              }`}
              type="text"
              id="author"
              value={author}
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
              onBlur={validateAuthor}
            />
            {errors.author && (
              <span className="text-red-500 text-sm mt-1">{errors.author}</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Rating:</label>
            <div className="flex items-center">
              <input
                className={`h-11 p-2 border-2 rounded-md shadow-sm ${
                  errors.rating ? "border-red-500" : "border-gray-200"
                }`}
                type="number"
                id="rating"
                value={rating}
                name="rating"
                min={0}
                max={5}
                step="0.1"
                onChange={handleRatingChange}
                onBlur={validateRating}
              />
              <span className="ml-2 text-sm text-gray-500">/5</span>
            </div>
            {errors.rating && (
              <span className="text-red-500 text-sm mt-1">{errors.rating}</span>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Review:</label>
            <textarea
              className={`h-24 p-2 border-2 rounded-md shadow-sm resize-none ${
                errors.review ? "border-red-500" : "border-gray-200"
              }`}
              id="review"
              value={review}
              name="review"
              onChange={(e) => setReview(e.target.value)}
              onBlur={validateReview}
            />
            {errors.review && (
              <span className="text-red-500 text-sm mt-1">{errors.review}</span>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
              type="submit"
            >
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddReview.propTypes = {
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
};

export default AddReview;
