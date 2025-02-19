import { useQuery } from "@tanstack/react-query";
import { FaChartLine, FaUsers, FaUtensils } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "./../../hooks/useAdmin";
import useAxiosSecure from "./../../hooks/useAxiosSecure";

const Overview = () => {
  const [isAdmin] = useAdmin();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

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
    requestMeals = [],
    reviews = [],
    upcomingMeals = [],
  } = adminDashboard;

  // Sample data for charts
  const barData = [
    { name: "Users", count: Users?.length },
    { name: "Meals Served", count: requestMeals?.length },
    { name: "Review", count: reviews?.length },
  ];

  const pieData = [
    { name: "Students", value: 60 },
    { name: "Staff", value: 30 },
    { name: "Guests", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center p-4 bg-blue-100 rounded-lg shadow">
          <FaUsers className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl font-bold">{Users?.length}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-green-100 rounded-lg shadow">
          <FaUtensils className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Meals Served</h3>
            <p className="text-xl font-bold">{requestMeals?.length}</p>
          </div>
        </div>

        <div className="flex items-center p-4 bg-yellow-100 rounded-lg shadow">
          <FaChartLine className="text-yellow-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Bookings</h3>
            <p className="text-xl font-bold">120</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-red-100 rounded-lg shadow">
          <MdOutlineRateReview className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Review</h3>
            <p className="text-xl font-bold">{reviews?.length}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">Overall Statistics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3498db" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="divider"></div>

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
              to={`${isAdmin ? "/dashboard/allMeals" : "/meals"}`}
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

      {/* Upcoming meal */}
      <div className="p-6  rounded-lg ">
        <h2 className="text-2xl font-mono mb-4">Upcoming Meals</h2>
        {upcomingMeals && upcomingMeals?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-lg">
              {/* Table Head */}
              <thead className="bg-[#2B3440]  text-white">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Likes</th>
                  <th className="py-3 px-4">Reviews</th>
                  <th className="py-3 px-4">Distributor</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {upcomingMeals?.slice(0, 5).map((meal, idx) => (
                  <tr
                    key={meal._id}
                    className="hover:bg-gray-100 transition duration-300"
                  >
                    <th className="py-2 px-4">{idx + 1}</th>
                    <td className="py-2 px-4">{meal?.title}</td>
                    <td className="py-2 px-4">{meal?.likes}</td>
                    <td className="py-2 px-4">{meal?.reviews.length}</td>
                    <td className="py-2 px-4 text-sm uppercase font-semibold">
                      {meal?.distributorName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-start mt-6">
              <Link
                to={`${isAdmin ? "/dashboard/serveMeals" : "/upcomingMeals"}`}
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

export default Overview;
