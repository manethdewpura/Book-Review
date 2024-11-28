import { useEffect, useState } from "react";
import axios from "axios";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import DeleteReview from "./DeleteReview";
import { FaStar, FaRegStar } from "react-icons/fa";

const ViewAllReviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [showDeleteReview, setShowDeleteReview] = useState(false);
  const [review, setReview] = useState({});
  const [id, setId] = useState(0);
  const [filterRating, setFilterRating] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Load reviews on initial render
  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Load reviews
  const loadItems = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/reviews")
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter((review) =>
      filterRating ? review.rating === parseInt(filterRating) : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length).toFixed(1)
      : 0;

  // Display loading message
  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  return (
    <div className="p-4 bg-slate-100 h-screen">
      <h1 className="text-3xl sm:text-6xl font-bold mb-4 text-center">
        All Reviews
      </h1>
      <h2 className="text-lg text-gray-600 font-bold mb-4 text-center">
        Overall Average Rating: {averageRating} / 5
      </h2>
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
          onClick={() => setShowAddReview(true)}
        >
          Add Review
        </button>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between items-center my-5 space-y-3 sm:space-y-0">
        <div className="flex items-center">
          <label className="mr-2">Filter by Rating:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">All</option>
            {[...Array(5).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label className="mr-2">Sort by Date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <ul className="space-y-4">
        {filteredReviews.map((review) => (
          <li
            key={review._id}
            className="border p-4 rounded shadow bg-white text-sm sm:text-base"
          >
            <h3 className="text-lg font-semibold">Book Title: {review.bookTitle}</h3>
            <p className="text-gray-700">Book Author: {review.bookAuthor}</p>
            <p className="text-gray-700">Rating: {review.rating} / 5</p>
            <div className="flex">
              {[...Array(5)].map((star, i) => (
                <label key={i}>
                  {i < review.rating ? (
                    <FaStar className="text-yellow-500" />
                  ) : (
                    <FaRegStar className="text-yellow-500" />
                  )}
                </label>
              ))}
            </div>
            <h4 className="text-lg font-semibold mt-2">Review</h4>
            <p className="text-gray-600">{review.review}</p>
            <div className="mt-2 flex space-x-2">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded w-full sm:w-auto"
                onClick={() => {
                  setShowEditReview(true);
                  setReview(review);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded w-full sm:w-auto"
                onClick={() => {
                  setShowDeleteReview(true);
                  setId(review._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showAddReview && (
        <AddReview
          onClose={() => setShowAddReview(false)}
          onAdd={() => loadItems()}
        />
      )}
      {showEditReview && (
        <EditReview
          oldReview={review}
          onClose={() => setShowEditReview(false)}
          onEdit={() => loadItems()}
        />
      )}
      {showDeleteReview && (
        <DeleteReview
          id={id}
          onClose={() => setShowDeleteReview(false)}
          onDelete={() => loadItems()}
        />
      )}
    </div>
  );
};

export default ViewAllReviews;
