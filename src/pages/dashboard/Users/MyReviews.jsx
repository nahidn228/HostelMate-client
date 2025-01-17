import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import UseTitle from "../../../components/UseTitle";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user.email}`);
      return res.data;
    },
  });
  console.log(reviews);
  return (
    <div className="p-6 bg-[#D1A054]  text-white rounded-lg shadow-lg">
      <UseTitle
        title={"Welcome to HostelMate"}
        subtitle={
          "Share your thoughts and feedback on your favorite meals with the community"
        }
      ></UseTitle>

      <h2 className="text-2xl font-mono mb-4">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
          {/* Table Head */}
          <thead className="bg-[#2B3440] text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Likes</th>
              <th className="py-3 px-4">Reviews</th>
              <th className="py-3 px-4">Edit</th>
              <th className="py-3 px-4">Delete</th>
              <th className="py-3 px-4">View Meal</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {reviews?.map((review, idx) => (
              <tr
                key={review._id}
                className="hover:bg-gray-100 transition duration-300"
              >
                <th className="py-2 px-4">{idx + 1}</th>
                <td className="py-2 px-4">{review.reviewMealTitle}</td>
                <td className="py-2 px-4">{review.reviewMealLikes}</td>
                <td className="py-2 px-4">
                  {review.reviewText.slice(0, 50)}...
                </td>
                <td className="py-2 px-4">
                  <button className="btn btn-sm btn-primary">
                    <FaEdit className="text-white" />
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button className="btn btn-sm btn-error">
                    <IoTrashBin className="text-white" />
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button className="btn btn-sm btn-accent">View Meal</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
