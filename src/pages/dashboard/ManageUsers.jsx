import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });
  console.log(users);
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
                <td className="">Role</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
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
