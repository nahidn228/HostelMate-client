/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaMoneyBillWave, FaUtensils } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: singleUserData = {} } = useQuery({
    queryKey: ["singleUserData", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-data/${user?.email}`);
      return res.data;
    },
  });
  console.log(singleUserData);

  return (
    <div className="p-6">
      {/* User Profile Section */}
      <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-full max-w-lg mx-auto">
        <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
          <img
            src={singleUserData?.user?.photo}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {singleUserData?.user?.name || "N/A"}
        </h2>
        <p className="text-gray-600">
          {singleUserData?.user?.email || "No Email"}
        </p>
        <span className="mt-2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-md">
          {singleUserData?.user?.badge || "User"}
        </span>
        {/* Account Creation & Last Login Info */}
        <div className="mt-4 space-y-2  text-center">
          <table>
            <tbody className='text-left'>
              <tr>
                <td className=" font-semibold">Account Created:</td>
                <td>
                  {user?.metadata?.createdAt
                    ? new Date(
                        parseInt(user.metadata?.createdAt)
                      ).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
              <tr>
                <td className=" font-semibold">Last Login:</td>
                <td>
                  {user?.metadata?.lastLoginAt
                    ? new Date(
                        parseInt(user.metadata?.lastLoginAt)
                      ).toLocaleString()
                    : "Unknown"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* User Dashboard Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<MdRateReview size={30} />}
          title="My Reviews"
          count={singleUserData?.reviews?.length}
          bgColor="bg-yellow-500"
        />
        <StatCard
          icon={<FaMoneyBillWave size={30} />}
          title="Payment History"
          count={singleUserData?.payments?.length}
          bgColor="bg-green-500"
        />
        <StatCard
          icon={<FaUtensils size={30} />}
          title="Meals Requested"
          count={singleUserData?.requestMeals?.length}
          bgColor="bg-red-500"
        />
        <StatCard
          icon={<FaUtensils size={30} />}
          title="Cart"
          count={singleUserData?.carts?.length}
          bgColor="bg-blue-500"
        />
      </div>

      {/* User Reviews */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">My Reviews</h2>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
            {/* Table Head */}
            <thead className="bg-[#2B3440]  text-white">
              <tr>
                <th className="py-3 px-4 ">#</th>
                <th className="py-3 px-4 ">Title</th>
                <th className="py-3 px-4">Likes</th>
                <th className="py-3 px-4 ">Reviews</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {singleUserData?.reviews?.slice(0, 5).map((review, idx) => (
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
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-start mt-6">
            <Link
              to="/dashboard/myReviews"
              className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
            >
              See More
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
            </Link>
          </div>
        </div>
      </div>

      {/* Request meal */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">My Request Meal</h2>
        {singleUserData?.requestMeals &&
        singleUserData?.requestMeals?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-lg">
              {/* Table Head */}
              <thead className="bg-[#2B3440]  text-white">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Likes</th>
                  <th className="py-3 px-4">Reviews</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {singleUserData?.requestMeals?.slice(0, 5).map((meal, idx) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-start mt-6">
              <Link
                to="/dashboard/mealRequest"
                className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer  font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
              >
                See More
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
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-6">
            <h2 className="text-3xl text-gray-100 font-mono">
              You do not have any requested meals.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, count, bgColor }) => {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg flex items-center ${bgColor} text-white`}
    >
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <p className="text-xl font-bold">{count}</p>
        <p className="text-md">{title}</p>
      </div>
    </div>
  );
};

export default UserHome;
