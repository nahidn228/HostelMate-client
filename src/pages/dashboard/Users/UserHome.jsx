/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaMoneyBillWave, FaUtensils } from "react-icons/fa";
import { MdOutlineEditCalendar, MdRateReview } from "react-icons/md";
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
        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary text-white bg-blue-500 shadow-lg hover:shadow-xl transition duration-300">
            <MdOutlineEditCalendar className="mr-2" /> Edit Profile
          </button>
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
