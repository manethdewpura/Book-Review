import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

const AddReview = ({ onClose, onAdd }) => {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  // Validation functions
  const validatebookName = () => bookName.trim().length > 0;
  const validateAuthor = () => author.trim().length > 0;
  const validateRating = () => rating >= 0 && rating <= 5;
  const validateReview = () => review.trim().length > 0;

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
        rating: rating,
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
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="w-[90%] max-w-lg bg-white rounded-xl p-4 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-black text-2xl sm:text-3xl my-4 font-bold text-center">
          Add Review
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Book Name:</label>
            <input
              className="h-11 p-2 border-gray-200 rounded-md border-2 shadow-sm"
              type="text"
              id="name"
              value={bookName}
              name="name"
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Author:</label>
            <input
              className="h-11 p-2 border-gray-200 rounded-md border-2 shadow-sm"
              type="text"
              id="author"
              value={author}
              name="author"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Rating:</label>
            <div className="flex items-center">
              <input
                className="h-11 p-2 border-gray-200 rounded-md border-2 shadow-sm"
                type="number"
                id="rating"
                value={rating}
                name="rating"
                min={0}
                max={5}
                onChange={(e) => setRating(e.target.value)}
              />
              <span className="ml-2 text-sm text-gray-500">/5</span>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-sm mb-1">Review:</label>
            <textarea
              className="h-24 p-2 border-gray-200 rounded-md border-2 shadow-smresize-none"
              id="review"
              value={review}
              name="review"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
