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
    </div>
  );
};

export default ManageUsers;
