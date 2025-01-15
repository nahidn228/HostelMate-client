import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const MealDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [likes, setLikes] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const {
    data: meal = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  const handleLike = () => setLikes(likes + 1);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview = {
      id: reviews.length + 1,
      text: reviewText,
      user: "Logged-in User", // Replace with actual user data
    };
    setReviews([...reviews, newReview]);
    setReviewText("");
  };

  return (
    <div className="flex flex-col  justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto">
      <div className="flex-1 px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800">
            Posted:
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              className="ml-1"
              readOnly
            />
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full">
            Distributor: {meal?.distributorName || "Unknown"}
          </span>
        </div>
        <img
          src={meal?.mealImage || "/fallback-image.jpg"}
          alt={meal?.title || "Meal"}
          className="w-full h-56 object-cover rounded-md mt-4"
        />
        <h1 className="mt-2 text-3xl font-semibold text-gray-800">
          {meal?.title || "Meal Title"}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {meal?.description || "No description available."}
        </p>
        <p className="mt-4 text-sm font-bold text-gray-600">Ingredients:</p>
        <ul className="list-disc pl-5 text-gray-600">
          {meal?.ingredients?.map((item, idx) => <li key={idx}>{item}</li>) || (
            <li>No ingredients listed.</li>
          )}
        </ul>
        <p className="mt-4 text-lg font-bold text-gray-600 flex gap-2">
          Rating:
          <Rating className="max-w-[80px]" value={meal?.rating} readOnly />
          {meal?.rating || "No rating"}
        </p>
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleLike}
          aria-label={`Like this meal. Current likes: ${likes}`}
        >
          Like ({likes})
        </button>
        {/* Meal Request Button */}
        <button
          className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={() =>
            alert("Meal request functionality pending login & subscription")
          }
        >
          Request Meal
        </button>
      </div>
      <section className="p-6 w-full bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Reviews ({meal?.reviews.length})
        </h2>
        <ul className="mt-4 ">
          {meal?.reviews.map((review, idx) => (
            <li
              key={idx}
              className="p-4 border-b border-gray-200 text-gray-600"
            >
              <p>
                <span className="font-semibold flex gap-2">
                  {review?.reviewerName}{" "}
                  <Rating
                    className="max-w-[80px]"
                    value={review?.rating}
                    readOnly
                  />{" "}
                </span>{" "}
                <br />
                {review?.reviewText}
              </p>
            </li>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          )}
        </ul>
        <form onSubmit={handleReviewSubmit} className="mt-6">
          <label className="text-gray-700" htmlFor="review">
            Add a Review
          </label>
          <textarea
            id="review"
            name="review"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md"
            placeholder="Write your review here..."
            required
          />
          <button
            type="submit"
            className="px-6 py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </section>
    </div>
  );
};

export default MealDetails;
