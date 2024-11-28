import { useEffect, useState } from "react";
import axios from "axios";
import AddReview from "./AddReview";
import EditReview from "./EditReview";
import DeleteReview from "./DeleteReview";

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

    const filteredReviews = reviews
        .filter((review) => (filterRating ? review.rating === parseInt(filterRating) : true))
        .sort((a, b) => {
            if (sortOrder === "asc") {
                return new Date(a.createdAt) - new Date(b.createdAt);
            } else {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4 bg-slate-100">
            <h1 className="text-6xl font-bold mb-4 text-center">All Reviews</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
                onClick={() => setShowAddReview(true)}
            >
                Add Review
            </button>
            <div className=" flex flex-row my-5">
                <label className="mr-2">Filter by Rating:</label>
                <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
                    <option value="">All</option>
                    {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                            {num + 1}
                        </option>
                    ))}
                </select>
                <label className="ml-5 mr-2">Sort by Date:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <ul className="space-y-4">
                {filteredReviews.map((review) => (
                    <li key={review._id} className="border p-4 rounded shadow bg-white">
                        <h3 className="text-xl font-semibold">Book Title : {review.bookTitle}</h3>
                        <p className="text-gray-700">Book Author : {review.bookAuthor}</p>
                        <p className="text-gray-700">Rating : {review.rating} / 10</p>
                        <h4 className="text-lg font-semibold mt-2">Review</h4>
                        <p className="text-gray-600">{review.review}</p>
                        <div className="mt-2 space-x-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    setShowEditReview(true);
                                    setReview(review);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
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
                <AddReview onClose={() => setShowAddReview(false)} onAdd={() => loadItems()} />
            )}
            {showEditReview && (
                <EditReview
                    oldReview={review}
                    onClose={() => setShowEditReview(false)}
                    onEdit={() => loadItems()}
                />
            )}
            {showDeleteReview && (
                <DeleteReview id={id} onClose={() => setShowDeleteReview(false)} onDelete={() => loadItems()} />
            )}
        </div>
    );
};

export default ViewAllReviews;