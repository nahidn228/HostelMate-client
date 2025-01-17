import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { IoTrashBin } from "react-icons/io5";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const RequestedMeal = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: requestMeal = [] } = useQuery({
    queryKey: ["requestMeal"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestMeal/${user.email}`);
      return res.data;
    },
  });
  console.log(requestMeal);

  return (
    <div className="p-6 bg-[#D1A054]  text-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-mono mb-4">
        My Request Meal: {requestMeal.length}
      </h2>
      {requestMeal && requestMeal.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-2xl">
            {/* Table Head */}
            <thead className="bg-[#2B3440]  text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Likes</th>
                <th className="py-3 px-4">Reviews</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {requestMeal.map((meal, idx) => (
                <tr
                  key={meal._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <th className="py-2 px-4">{idx + 1}</th>
                  <td className="py-2 px-4">{meal?.title}</td>
                  <td className="py-2 px-4">{meal?.likes}</td>
                  <td className="py-2 px-4">{meal?.reviews.length}</td>
                  <td className="py-2 px-4 text-sm uppercase font-semibold">
                    {meal?.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      className="btn btn-ghost text-lg text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Meal"
                    >
                      <IoTrashBin />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center py-6">
          <h2 className="text-3xl text-gray-100 font-mono">
            You do not have any requested meals.
          </h2>
        </div>
      )}
    </div>
  );
};

export default RequestedMeal;
