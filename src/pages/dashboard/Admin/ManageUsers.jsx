/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${search}`);
      return res.data;
    },
  });
  console.log(users);
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleMakeAdmin = async (user) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to make Admin to ${user.name} !`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/admin/${user?._id}`).then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Admin!",
                text: `${user.name} is an Admin Now`,
                icon: "success",
              });
            }
          });
        }
      });
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
  <form className="flex items-center justify-between mb-10">
    <h2 className="text-3xl font-semibold text-[#2B3440] mb-5">All Users: {users.length}</h2>
    
    <label className="input input-bordered flex items-center gap-2 border-[#D1A054]">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="grow text-[#2B3440] focus:outline-none"
        placeholder="Enter User Name or Email"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="h-4 w-4 opacity-70 text-[#D1A054]"
      >
        <path
          fillRule="evenodd"
          d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
          clipRule="evenodd"
        />
      </svg>
    </label>
  </form>

  <div className="overflow-x-auto">
    <table className="table-auto w-full bg-gray-50 shadow-md rounded-lg">
      {/* head */}
      <thead className="bg-[#2B3440] text-white">
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Badge</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="text-[#2B3440]">
        {users.map((user, idx) => (
          <tr key={user._id} className="hover:bg-[#D1A054]">
            <td className="px-4 py-2">{idx + 1}</td>
            <td className="px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-12 w-12">
                    <img src={user?.photo} alt={user?.name} />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{user?.name}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-2">{user?.email}</td>
            <td className="px-4 py-2">{user?.badge}</td>
            <td className="px-4 py-2 text-xl">
              {user.role === "admin" ? (
                <p className="font-semibold text-base">Admin</p>
              ) : (
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="btn btn-ghost text-lg text-[#D1A054] hover:text-[#2B3440]"
                >
                  <FaUserAlt />
                </button>
              )}
            </td>
            <th className="px-4 py-2">
              <button
                onClick={() => handleDeleteUser(user)}
                className="btn btn-ghost text-lg text-red-600 hover:text-red-800"
              >
                <IoTrashBin />
              </button>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ManageUsers;
