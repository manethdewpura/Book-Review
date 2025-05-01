import axios from "axios";
import PropTypes from "prop-types";
import { MdOutlineCancel } from "react-icons/md";

const DeleteReview = ({ id, onClose, onDelete }) => {
  // Handle delete
  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/reviews/${id}`)
      .then(() => {
        onDelete();
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting review: ", error);
      });
  };

  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[90%] max-w-md bg-white rounded-xl p-4 flex flex-col relative"
      >
        <h1 className="text-2xl sm:text-3xl my-4 font-semibold text-center">
          Delete Review
        </h1>
        <MdOutlineCancel
          className="absolute top-4 right-4 text-2xl sm:text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col items-center p-4">
          <h3 className="text-lg sm:text-xl text-center font-medium mb-6">
            Are you sure you want to delete this review? This action cannot be undone.
          </h3>

          <button
            className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
            onClick={handleDelete}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteReview.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteReview;
