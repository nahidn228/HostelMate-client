import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEdit,
} from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const AllMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: { meals = [], totalPages } = {} } = useQuery({
    queryKey: ["meals", sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allMeals?sort=${sort}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  const handleReset = () => {
    setSort("");
  };

  return (
    <div className="max-w-7xl p-6 bg-gray-50   text-white rounded-lg shadow-lg">
  {/* Sorting Options */}
  <div className="flex gap-6 items-center justify-between mb-8">
    <h2 className="text-3xl font-semibold text-[#2B3440]">All Meals</h2>
    <div className="flex gap-4 items-center">
      <select
        className="border p-3 rounded-xl text-lg text-[#2B3440] focus:ring-2 focus:ring-[#D1A054]"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By Likes</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={handleReset} className="btn btn-outline text-lg" disabled={!sort}>
        Reset
      </button>
    </div>
  </div>

  {/* Table */}
  <div className="overflow-x-auto min-h-screen">
    <table className="table-auto w-full text-left bg-gray-50 shadow-md rounded-lg">
      <thead className="bg-[#2B3440] text-white">
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Likes</th>
          <th className="px-4 py-2">Reviews Count</th>
          <th className="px-4 py-2">Distributor Name</th>
          <th className="px-4 py-2">Update</th>
          <th className="px-4 py-2">Delete</th>
          <th className="px-4 py-2">View Meal</th>
        </tr>
      </thead>
      <tbody className="text-[#2B3440]">
        {meals.map((meal, idx) => (
          <tr key={meal._id} className="">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-4 py-2">{meal.title}</td>
            <td className="px-4 py-2">{meal.likes}</td>
            <td className="px-4 py-2">{meal.reviews?.length || 0}</td>
            <td className="px-4 py-2">{meal.distributorName || "N/A"}</td>
            <td className="px-4 py-2">
              <button
                aria-label="Update Meal"
                className="btn btn-ghost text-lg text-[#D1A054] hover:text-[#2B3440]"
              >
                <FaEdit />
              </button>
            </td>
            <td className="px-4 py-2">
              <button
                aria-label="Delete Meal"
                className="btn btn-ghost text-lg text-red-600 hover:text-red-800"
              >
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

export default AllMeal;
