import { IoTrashBin } from "react-icons/io5";
const RequestedMeal = () => {
  return (
    <div>
      <h2 className="text-2xl font-mono">My Request Meal</h2>
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
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
              <td>Blue</td>
              <td>
                <button className="btn btn-ghost text-lg text-orange-700">
                  <IoTrashBin />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedMeal;
