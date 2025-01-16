import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user.email}`);
      return res.data;
    },
  });
  console.log(reviews);
  return (
    <div>
      <h2 className="text-2xl font-mono">My Reviews </h2>
      <div className="overflow-x-auto font-sans">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Likes</th>
              <th>Reviews</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>View Meal</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Meal Title</td>
              <td>Likes Count</td>
              <td>Reviews count</td>
              <td>
                <button className="btn btn-ghost text-lg ">
                  <FaEdit />
                </button>
              </td>

              <td>
                <button className="btn btn-ghost text-lg text-orange-700">
                  <IoTrashBin />
                </button>
              </td>
              <td>View Meal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
