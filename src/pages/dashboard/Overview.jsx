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
import useAxiosPublic from "./../../hooks/useAxiosPublic";

const Overview = () => {
  const axiosPublic = useAxiosPublic();

  const { data: meals = [] } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/meals`);
      return res.data;
    },
  });

  console.log(meals);

  // Sample data for charts
  const barData = [
    { name: "Users", count: 120 },
    { name: "Meals Served", count: 500 },
    { name: "Bookings", count: 120 },
  ];

  const pieData = [
    { name: "Students", value: 60 },
    { name: "Staff", value: 30 },
    { name: "Guests", value: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
         Overview
      </h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center p-4 bg-blue-100 rounded-lg shadow">
          <FaUsers className="text-blue-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-xl font-bold">120</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-green-100 rounded-lg shadow">
          <FaUtensils className="text-green-600 text-3xl mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Meals Served</h3>
            <p className="text-xl font-bold">500</p>
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
            <p className="text-xl font-bold">600</p>
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
         Meals
      </h2>
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
            </tr>
          </thead>
          <tbody className="text-[#2B3440]">
            {meals?.slice(0, 5).map((meal, idx) => (
              <tr key={meal._id} className="">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{meal.title}</td>
                <td className="px-4 py-2">{meal.likes}</td>
                <td className="px-4 py-2">{meal.reviews?.length || 0}</td>
                <td className="px-4 py-2">{meal.distributorName || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
