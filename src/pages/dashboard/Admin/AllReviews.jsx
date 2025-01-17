import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: { meals = [], totalPages } = {} } = useQuery({
    queryKey: ["meals", page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allMeals?page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  console.log(meals);

  return (
    <div>
      <h2 className="text-2xl font-mono mb-10">All Reviews </h2>
      <div className="overflow-x-auto font-sans min-h-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Review_Count</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {meals?.map((review, idx) => (
              <tr key={review._id}>
                <th>{idx + 1}</th>
                <td>{review.title}</td>
                <td>{review.likes}</td>
                <td className="text-center">{review.reviews?.length}</td>

                <td>
                  <button className="btn btn-ghost text-lg text-orange-700">
                    <IoTrashBin />
                  </button>
                </td>
                <td>View Meal</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="btn btn-sm text-xl"
        >
          <FaArrowAltCircleLeft />
        </button>
        <span className="font-semibold font-lato"> {page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-sm text-xl"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default AllReviews;
