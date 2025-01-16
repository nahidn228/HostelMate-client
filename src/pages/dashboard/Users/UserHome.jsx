import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const UserHome = () => {
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
    <div className="flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring ring-offset-2">
          <img src={singleUser?.photo} />
          <p className="badge badge-secondary absolute top-2  -right-5 font-bold">{singleUser?.badge}</p>
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl uppercase"> Name: {singleUser?.name} </h2>
        <h2 className="text-2xl "> Email: {singleUser?.email} </h2>
        <h2 className="text-2xl "> Badge: {singleUser?.badge} </h2>
      </div>
    </div>
  );
};

export default UserHome;
