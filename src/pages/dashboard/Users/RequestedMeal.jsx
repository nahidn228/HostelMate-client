import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { IoTrashBin } from "react-icons/io5";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const RequestedMeal = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: requestMeal = [] } = useQuery({
    queryKey: ["requestMeal"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestMeal/${user.email}`);
      return res.data;
    },
  });
  console.log(requestMeal);

  return (
    <div>
      <h2 className="text-2xl font-mono">
        My Request Meal: {requestMeal.length}{" "}
      </h2>
      {requestMeal ? (
        <div className="overflow-x-auto font-sans">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestMeal.map((meal,idx) => (
                <tr key={meal._id}>
                  <th>{idx+1}</th>
                  <td>{meal?.title}</td>
                  <td>{meal?.likes}</td>
                  <td>{meal?.reviews.length}</td>
                  <td className='text-sm uppercase'>{meal?.status}</td>
                  <td>
                    <button className="btn btn-ghost text-lg text-orange-700">
                      <IoTrashBin />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-end justify-center">
          {" "}
          <h2 className="text-3xl text-gray-700">
            {" "}
            You Do not request Any Meal{" "}
          </h2>{" "}
        </div>
      )}
    </div>
  );
};

export default RequestedMeal;
