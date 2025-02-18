import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaEdit,
} from "react-icons/fa";
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
          <button
            onClick={handleReset}
            className="btn btn-outline text-lg"
            disabled={!sort}
          >
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
              <th className="px-4 py-2">Count</th>
              <th className="px-4 py-2">Distributor</th>
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
                    className="btn btn-ghost text-lg text-blue-700 hover:text-[#2B3440]"
                  >
                    <FaEdit />
                  </button>
                </td>
                <td className="px-4 py-2">
                  {/* delete button */}
                  <button className="group relative flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-xl border-2  bg-orange-600 hover:bg-red-600">
                    <svg
                      viewBox="0 0 1.625 1.625"
                      className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                      height="12"
                      width="12"
                    >
                      <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                      <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                      <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                    </svg>
                    <svg
                      width="12"
                      fill="none"
                      viewBox="0 0 39 7"
                      className="origin-right duration-500 group-hover:rotate-90"
                    >
                      <line
                        strokeWidth="4"
                        stroke="white"
                        y2="5"
                        x2="39"
                        y1="5"
                      ></line>
                      <line
                        strokeWidth="3"
                        stroke="white"
                        y2="1.5"
                        x2="26.0357"
                        y1="1.5"
                        x1="12"
                      ></line>
                    </svg>
                    <svg
                      width="12"
                      fill="none"
                      viewBox="0 0 33 39"
                      className=""
                    >
                      <mask fill="white" id="path-1-inside-1_8_19">
                        <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                      </mask>
                      <path
                        mask="url(#path-1-inside-1_8_19)"
                        fill="white"
                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                      ></path>
                      <path
                        strokeWidth="4"
                        stroke="white"
                        d="M12 6L12 29"
                      ></path>
                      <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                    </svg>
                  </button>
                </td>
                <td className="px-6 py-2">
               
                  <button className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3">
                    View
                    <svg
                      className="w-4 h-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      ></path>
                    </svg>
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
