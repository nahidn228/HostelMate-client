import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GiHotMeal } from "react-icons/gi";
import Swal from "sweetalert2";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const ServeMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const { data: serveMeals = [], refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requestMeal?search=${search}`);
      return res.data;
    },
  });

  console.log(serveMeals);

  const handleServe = async (meal) => {
    const { data } = await axiosSecure.patch(`/requestMeal/${meal._id}`);
    if (data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Serve!",
        text: `${meal.title} is Served`,
        icon: "success",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-mono ">Serve Meals </h2>
        <div className="join">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered join-item"
            placeholder="Email"
          />
          <button className="btn join-item rounded-r-full">Search</button>
        </div>
      </div>
      <div className="overflow-x-auto font-sans min-h-screen">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {serveMeals?.map((meal, idx) => (
              <tr key={meal._id}>
                <th>{idx + 1}</th>
                <td>{meal.title}</td>
                <td>{meal?.name ? meal?.name : "Anonymous"}</td>
                <td className="text-center">{meal.email}</td>
                <td className="uppercase">{meal.status}</td>
                <td>
                  <button
                    onClick={() => handleServe(meal)}
                    className="btn  btn-outline btn-sm  "
                  >
                    <GiHotMeal />
                    Serve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServeMeal;
