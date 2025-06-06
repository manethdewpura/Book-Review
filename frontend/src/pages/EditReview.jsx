import axios from 'axios';
import PropTypes from "prop-types";
import { useState } from 'react';

const EditReview = ({ oldReview, onClose, onEdit }) => {
  const [bookName, setBookName] = useState(oldReview.bookTitle);
  const [author, setAuthor] = useState(oldReview.bookAuthor);
  const [rating, setRating] = useState(oldReview.rating);
  const [review, setReview] = useState(oldReview.review);

  // Validation functions
  const validatebookName = () => bookName.trim().length > 0;
  const validateAuthor = () => author.trim().length > 0;
  const validateRating = () => rating >= 0 && rating <= 5;
  const validateReview = () => review.trim().length > 0;


  // Handle submit
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
        .put(`http://localhost:3000/reviews/${oldReview._id}`, newReview)
        .then(() => {
          onEdit();
          onClose();
        })
        .catch((error) => {
          console.error("Error editing review: ", error);
        });
    } else {
      alert("Please fill in all fields");
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
          Edit Review
        </h1>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <label className="text-sm mb-1">Review:</label>
            <textarea
              className="h-24 p-2 border-gray-200 rounded-md border-2 shadow-sm resize-none"
              id="review"
              value={review}
              name="review"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-200"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditReview.propTypes = {
  oldReview: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default EditReview;
