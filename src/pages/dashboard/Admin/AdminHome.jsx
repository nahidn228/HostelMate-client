import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useContext } from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaListAlt,
  FaShoppingCart,
  FaStar,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  console.log(user);

  // Fetch All Data Collections
  const { data: adminDashboard = {} } = useQuery({
    queryKey: ["adminDashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminDashboard/${user?.email}`);
      return res.data;
    },
  });

  const {
    Users = [],
    Meals = [],
    carts = [],
    payments = [],
    requestMeals = [],
    reviews = [],
    upcomingMeals = [],
  } = adminDashboard;

  return (
    <div className="p-6  rounded-lg shadow-xl">
      {/* Admin Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center p-6 bg-[#142943] text-white rounded-2xl shadow-xl w-full max-w-lg mx-auto"
      >
        {/* Profile Image with Animation */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
        >
          <img
            src={
              adminDashboard?.user?.photo ||
              "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
            }
            alt="Admin Avatar"
            className="w-full h-full object-cover"
          />
          <span className="absolute z-10 bottom-2 right-2 px-3 py-1 bg-blue-700 text-white text-sm font-semibold rounded-md shadow-md">
            {adminDashboard?.user?.role === "admin" ? "Admin" : "User"}
          </span>
        </motion.div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4 text-gray-200">
          <span className="text-blue-400">Name:</span>{" "}
          {adminDashboard?.user?.name || "Unknown"}
        </h2>

        <h2 className="text-xl mt-1 text-gray-300">
          <span className="text-blue-400">Email:</span>{" "}
          {user?.email || "No email provided"}
        </h2>

        {/* Account Creation & Last Login Info */}
        <div className="mt-4 space-y-2 text-gray-400 text-center">
          <h2>
            <span className="text-blue-400 font-semibold">
              Account Created:
            </span>{" "}
            {user?.metadata?.createdAt
              ? new Date(parseInt(user.metadata?.createdAt)).toLocaleString()
              : "Unknown"}
          </h2>

          <h2>
            <span className="text-blue-400 font-semibold">Last Login:</span>{" "}
            {user?.metadata?.lastLoginAt
              ? new Date(parseInt(user.metadata?.lastLoginAt)).toLocaleString()
              : "Unknown"}
          </h2>
        </div>
      </motion.div>

      {/* Dashboard Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* Users */}
        <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md text-center">
          <FaUsers className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Total Users</h3>
          <p className="text-2xl font-bold">{Users.length}</p>
        </div>

        {/* Meals */}
        <div className="p-4 bg-green-600 text-white rounded-lg shadow-md text-center">
          <FaUtensils className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Total Meals</h3>
          <p className="text-2xl font-bold">{Meals.length}</p>
        </div>

        {/* Carts */}
        <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md text-center">
          <FaShoppingCart className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Total Carts</h3>
          <p className="text-2xl font-bold">{carts.length}</p>
        </div>

        {/* Payments */}
        <div className="p-4 bg-purple-600 text-white rounded-lg shadow-md text-center">
          <FaDollarSign className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Total Payments</h3>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>

        {/* Request Meals */}
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center">
          <FaListAlt className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Request Meals</h3>
          <p className="text-2xl font-bold">{requestMeals.length}</p>
        </div>

        {/* Reviews */}
        <div className="p-4 bg-pink-600 text-white rounded-lg shadow-md text-center">
          <FaStar className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Total Reviews</h3>
          <p className="text-2xl font-bold">{reviews.length}</p>
        </div>

        {/* Upcoming Meals */}
        <div className="p-4 bg-indigo-600 text-white rounded-lg shadow-md text-center">
          <FaCalendarAlt className="text-4xl mx-auto" />
          <h3 className="text-lg mt-2">Upcoming Meals</h3>
          <p className="text-2xl font-bold">{upcomingMeals.length}</p>
        </div>
      </div>

      {/* Total User */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
            {/* Table Head */}
            <thead className="bg-[#2B3440]  text-white">
              <tr>
                <th className="py-3 px-4 ">#</th>
                <th className="py-3 px-4 ">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 ">Badge</th>
                <th className="py-3 px-4 ">Role</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {Users?.slice(0, 5).map((user, idx) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <th className="py-2 px-4">{idx + 1}</th>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.badge}</td>
                  <td className="py-2 px-4">
                    {user.role ? user.role : "user"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-start mt-6">
            <Link
              to="/dashboard/manage-users"
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

      {/* All Meals */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">Meals</h2>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
            {/* Table Head */}
            <thead className="bg-[#2B3440]  text-white">
              <tr>
                <th className="py-3 px-4 ">#</th>
                <th className="py-3 px-4 ">Name</th>
                <th className="py-3 px-4">Distributor</th>
                <th className="py-3 px-4">Meal Request</th>
                <th className="py-3 px-4 ">Rating</th>
                <th className="py-3 px-4 ">Likes</th>
                <th className="py-3 px-4 ">Price</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {Meals?.slice(0, 5).map((meal, idx) => (
                <tr
                  key={meal._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <th className="py-2 px-4">{idx + 1}</th>
                  <td className="py-2 px-4">{meal.title}</td>
                  <td className="py-2 px-4">{meal.distributorName}</td>
                  <td className="py-2 px-4">{meal.mealRequest}</td>
                  <td className="py-2 px-4">{meal.rating}</td>
                  <td className="py-2 px-4">{meal.likes}</td>
                  <td className="py-2 px-4">{meal.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-start mt-6">
            <Link
              to="/dashboard/allMeals"
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

      {/* Total Carts */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4"> Carts</h2>
        <div className="overflow-x-auto">
          <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
            {/* Table Head */}
            <thead className="bg-[#2B3440]  text-white">
              <tr>
                <th className="py-3 px-4 ">#</th>
                <th className="py-3 px-4 ">ID</th>
                <th className="py-3 px-4">Badge Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4 ">Price</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {carts?.slice(0, 5).map((cart, idx) => (
                <tr
                  key={cart._id}
                  className="hover:bg-gray-100 transition duration-300"
                >
                  <th className="py-2 px-4">{idx + 1}</th>
                  <td className="py-2 px-4">{cart._id}</td>
                  <td className="py-2 px-4">{cart.name}</td>
                  <td className="py-2 px-4">
                    {cart.email ? cart.email : "Unknown"}
                  </td>
                  <td className="py-2 px-4">{cart.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Reviews */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">Reviews</h2>
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
              {reviews?.slice(0, 5).map((review, idx) => (
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
              to="/dashboard/allReviews"
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
        <h2 className="text-2xl font-mono mb-4">Requested Meal</h2>
        {requestMeals && requestMeals?.length > 0 ? (
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
                {requestMeals?.slice(0, 5).map((meal, idx) => (
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
                to="/dashboard/serveMeals"
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

export default AdminHome;
