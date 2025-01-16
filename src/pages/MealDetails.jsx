import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import useAxiosSecure from "./../hooks/useAxiosSecure";

const MealDetails = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [startDate, setStartDate] = useState(new Date());
  const [isLiked, setIsLiked] = useState(false);

  const {
    data: meal = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["meals", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals/${id}`);
      return res.data;
    },
  });
  console.log(meal);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong!</div>;

  const handleLike = async () => {
    const likes = parseInt(meal?.likes + 1);
    if (user) {
      try {
        const { data } = await axiosSecure.patch(`/meals/${id}`, likes);
        console.log("Like added:", data);
        if (data?.modifiedCount > 0) {
          refetch();
          setIsLiked(true);
          toast.success(`Thank you ${user?.displayName} for like our Food`);
        }
      } catch (err) {
        console.error("Failed to add like:", err);
        toast.error(err);
      }
    } else {
      toast.error("Please Login first to like our food");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const reviewText = e.target.review.value;
    const newReview = {
      reviewerName: user?.displayName || "Anonymous",
      reviewText,
    };

    try {
      // Send the new review to the server
      const { data } = await axiosPublic.post(`/meals/${id}`, newReview);

      console.log("Review added:", data);
      if (data?.modifiedCount > 0) {
        refetch();
        e.target.reset();
        toast.success("Review added Successful");
      }
    } catch (err) {
      console.error("Failed to add review:", err);
      toast.error(err);
    }
  };

  const handleMealRequest = async () => {
    try {
      const mealRequest = {
        meal_id: meal?._id,
        title: meal.title,
        category: meal.category,
        likes: meal?.likes,
        reviews: meal?.reviews,
        status: "pending",
        email: user?.email,
      };
      const { data } = await axiosSecure.post(
        `/requestMeal/${id}`,
        mealRequest
      );
      console.log("Meal request Successful :", data);
      if (data?.acknowledged === true) {
        toast.success(`${meal?.title} is Successfully request for order`);
        navigate("/dashboard/mealRequest");
      }
    } catch (err) {
      console.error("Failed to add Food request:", err);
      toast.error(err);
    }
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
          disabled={`${isLiked ? "disabled" : ""}`}
          className={`  mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
            isLiked ? "btn-disabled bg-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={handleLike}
        >
          Like ({meal?.likes})
        </button>
        {/* Meal Request Button */}
        <button
          className="mt-4 ml-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          onClick={handleMealRequest}
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
                  {review?.reviewerName}
                  {review.rating ? (
                    <Rating
                      className="max-w-[80px]"
                      value={review?.rating}
                      readOnly
                    />
                  ) : (
                    ""
                  )}
                </span>{" "}
                <br />
                {review?.reviewText}
              </p>
            </li>
          ))}
          {meal?.reviews.map(
            (review, idx) =>
              review.length === 0 && (
                <p key={idx} className="text-gray-500">
                  No reviews yet. Be the first to review!
                </p>
              )
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
