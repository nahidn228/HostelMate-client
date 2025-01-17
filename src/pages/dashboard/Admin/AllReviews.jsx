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
    <div className="max-w-7xl p-6 bg-gray-50   text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-[#2B3440] mb-8">
        All Reviews
      </h2>

      <div className="overflow-x-auto font-sans min-h-screen">
        <table className="table-auto w-full text-left bg-gray-50 shadow-md rounded-lg">
          {/* Head */}
          <thead className="bg-[#2B3440] text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Likes</th>
              <th className="px-4 py-2">Review Count</th>
              <th className="px-4 py-2">Delete</th>
              <th className="px-4 py-2">View Meal</th>
            </tr>
          </thead>
          <tbody className="text-[#2B3440]">
            {meals?.map((review, idx) => (
              <tr key={review._id} className="">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{review.title}</td>
                <td className="px-4 py-2">{review.likes}</td>
                <td className="text-center px-4 py-2">
                  {review.reviews?.length}
                </td>

                <td className="px-4 py-2">
                  <button className="btn btn-ghost text-lg text-red-600 hover:text-red-800">
                    <IoTrashBin />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-lg text-[#D1A054] hover:text-[#2B3440]"
                    aria-label="View Meal"
                  >
                    View Meal
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="btn btn-sm text-xl text-[#2B3440] hover:text-[#D1A054]"
        >
          <FaArrowAltCircleLeft />
        </button>
        <span className="font-semibold text-lg">{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="btn btn-sm text-xl text-[#2B3440] hover:text-[#D1A054]"
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default AllReviews;
