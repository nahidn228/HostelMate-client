import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  console.log(id, navigate);

  const [likes, setLikes] = useState(0);
  const [reviews, setReviews] = useState([]); // Placeholder for reviews
  const [reviewText, setReviewText] = useState(""); // For adding a new review

  const { data: meal, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });

  console.log(meal);
  const [startDate, setStartDate] = useState(new Date());

  // Handle Like Button Click
  const handleLike = () => {
    // Increment likes and update backend (mocked here)
    setLikes(likes + 1);
    // Add logic to send like count to the server
  };

  // Handle Review Submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText) return;

    // Add review to the list (you can send this to the server)
    const newReview = {
      id: reviews.length + 1,
      text: reviewText,
      user: "Logged-in User", // Replace with actual user info
    };
    setReviews([...reviews, newReview]);
    setReviewText(""); // Clear input
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto">
      {/* Meal Details */}
      <div className="flex-1 px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800">
            Posted:
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="ml-1"
              readOnly
            />
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full">
            Distributor: {meal?.distributorName}
          </span>
        </div>

        <div>
          <img
            src={meal?.mealImage} // Replace with meal image URL
            alt={meal?.title}
            className="w-full h-56 object-cover rounded-md mt-4"
          />
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">
            {meal?.title}
          </h1>
          <p className="mt-2 text-lg text-gray-600">{meal?.description}</p>
          <p className="mt-4 text-sm font-bold text-gray-600">Ingredients:</p>
          <ul className="list-disc pl-5 text-gray-600">
            {meal?.ingredients.map((item, idx) => (
              <li key={idx}>{item} </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold text-gray-600 flex gap-2">
            Rating:
            <Rating style={{ maxWidth: 80 }} value={meal?.rating} readOnly />
            {meal?.rating}
          </p>
        </div>

        {/* Like Button */}
        <button
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleLike}
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

      {/* Review Section */}
      <section className="p-6 w-full bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Reviews
        </h2>
        <ul className="mt-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="p-4 border-b border-gray-200 text-gray-600"
            >
              <p>
                <span className="font-semibold">{review.user}:</span>{" "}
                {review.text}
              </p>
            </li>
          ))}
          {reviews.length === 0 && (
            <p className="text-gray-500">
              No reviews yet. Be the first to review!
            </p>
          )}
        </ul>

        {/* Add Review Form */}
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
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
          ></textarea>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Submit Review
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MealDetails;
