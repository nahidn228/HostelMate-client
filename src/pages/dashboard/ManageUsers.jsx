/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { FaUserAlt } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
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
        axiosPublic.delete(`/users/${user?._id}`).then((res) => {
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
  const handleAdminUser = (user) => {};

  return (
    <div>
      <h2 className="text-2xl">All Users {users.length} </h2>

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
                  {" "}
                  <button
                    onClick={() => handleAdminUser(user)}
                    className="btn btn-ghost text-lg "
                  >
                    <FaUserAlt />
                  </button>{" "}
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
