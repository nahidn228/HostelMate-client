import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: singleUser = {} } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  console.log(singleUser);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
    {/* Avatar Section */}
    <div className="relative avatar mb-6">
      <div className="w-40 h-40 rounded-full ring-2 ring-gray-300 shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
        <img src={singleUser?.photo} alt="User Avatar" className="w-full h-full object-cover" />
      </div>
      <span className="badge absolute top-2 right-2 font-bold px-3 py-1 bg-yellow-500 text-gray-900 shadow-md">
        {singleUser?.badge || "User"}
      </span>
    </div>
  
    {/* User Details Section */}
    <div className="text-center space-y-4">
      <h2 className="text-2xl uppercase font-bold text-gray-800">
        <span className="text-yellow-500">Name:</span>{" "}
        {singleUser?.name || "N/A"}
      </h2>
      <h2 className="text-xl text-gray-800">
        <span className="text-yellow-500">Email:</span>{" "}
        {singleUser?.email || "No Email"}
      </h2>
      <h2 className="text-xl text-gray-800">
        <span className="text-yellow-500">Badge:</span>{" "}
        {singleUser?.badge || "None"}
      </h2>
    </div>
  
    {/* CTA Buttons */}
    <div className="flex gap-4 mt-6">
      <button className="btn btn-primary btn-sm bg-yellow-500 text-gray-900 shadow-lg hover:shadow-xl transition duration-300">
        <i className="mr-2">👤</i> Profile
      </button>
      <button className="btn btn-secondary btn-sm bg-gray-800 text-yellow-500 shadow-lg hover:shadow-xl transition duration-300">
        <MdOutlineEditCalendar className="mr-2" />
        Edit Profile
      </button>
    </div>
  </div>
  
  );
};

export default UserHome;
