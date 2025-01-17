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
    <div>
      {/* Sorting Options */}
      <div className="flex gap-4 items-center justify-center mb-10">
        <select
          className="border p-4 rounded-md"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By Likes</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <button onClick={handleReset} className="btn" disabled={!sort}>
          Reset
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto min-h-screen">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Likes</th>
              <th>Reviews Count</th>
              <th>Distributor Name</th>
              <th>Update</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, idx) => (
              <tr key={meal._id}>
                <th>{idx + 1}</th>
                <td>{meal.title}</td>
                <td>{meal.likes}</td>
                <td>{meal.reviews?.length || 0}</td>
                <td>{meal.distributorName || "N/A"}</td>
                <td>
                  <button
                    aria-label="Update Meal"
                    className="btn btn-ghost text-lg"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td>
                  <button
                    aria-label="Delete Meal"
                    className="btn btn-ghost text-lg text-orange-700"
                  >
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

export default AllMeal;
