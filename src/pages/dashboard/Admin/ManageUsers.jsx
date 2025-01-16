/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
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
  const handleClear = () => {
    refetch();
    setSearch("");
  };

  return (
    <div>
      <h2 className="text-2xl">All Users {users.length} </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          refetch();
        }}
      >
        <div className="flex flex-col sm:flex-row p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <label htmlFor="search" className="sr-only">
            Enter User Name or Email
          </label>
          <input
            id="search"
            className="flex-1 px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:ring focus:ring-blue-300"
            type="text"
            name="search"
            placeholder="Enter User Name or Email"
            aria-label="Enter User Name or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
          {search && (
            <button
              type="button"
              onClick={handleClear}
              className="mt-2 sm:mt-0 sm:ml-2 px-1 py-3 text-gray-400 hover:text-gray-700 transition duration-300 focus:outline-none"
              aria-label="Clear Search"
            >
              <AiOutlineClose size={20} />
            </button>
          )}
          <button
            type="submit"
            className="mt-2 sm:mt-0 sm:ml-2 px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Badge</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <th>{idx + 1}</th>
                <td>
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
                <td>{user?.email}</td>
                <td>{user?.badge}</td>
                <td className="text-xl">
                  {user.role === "admin" ? (
                    <p className="font-semibold text-base">Admin</p>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost text-lg "
                    >
                      <FaUserAlt />
                    </button>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost text-lg text-orange-700"
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
