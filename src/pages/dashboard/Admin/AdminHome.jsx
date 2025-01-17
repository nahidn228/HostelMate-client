import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { MdOutlineEditCalendar } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: singleUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
    },
  });
  console.log(singleUser);
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-[#D1A054] to-[#2B3440] text-white rounded-lg shadow-xl">
      {/* Avatar with Badge */}
      <div className="relative avatar mb-6">
        <div className="w-40 rounded-full ring ring-offset-2 ring-offset-base-100 ring-[#D1A054] shadow-lg hover:scale-105 transition-transform duration-300">
          <img src={singleUser?.photo} alt="User Avatar" />
        </div>
        <span className="badge absolute top-2 right-2 font-bold px-3 py-1 bg-[#D1A054] text-[#2B3440] shadow-lg">
          {singleUser?.role === "admin" ? "Admin" : singleUser?.badge || "User"}
        </span>
      </div>

      {/* User Details */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl uppercase font-bold">
          <span className="text-[#D1A054]">Name:</span>{" "}
          {singleUser?.name || "Unknown"}
        </h2>
        <h2 className="text-xl">
          <span className="text-[#D1A054]">Email:</span>{" "}
          {singleUser?.email || "No email provided"}
        </h2>
        <h2 className="text-xl">
          <span className="text-[#D1A054]">Badge:</span>{" "}
          {singleUser?.badge || "No badge"}
        </h2>
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="btn btn-primary btn-sm bg-[#D1A054] text-[#2B3440] shadow-lg hover:shadow-2xl transition duration-300">
          <i className="mr-2">👤</i> Profile
        </button>
        <button className="btn btn-secondary btn-sm bg-[#2B3440] text-[#D1A054] shadow-lg hover:shadow-2xl transition duration-300">
          <MdOutlineEditCalendar />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AdminHome;
