import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    refetch();
  }, [refetch, search]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <div className="flex items-center justify-between mb-10">
      <h2 className="text-3xl font-semibold text-[#2B3440]">Serve Meals</h2>
      
      <div className="join">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered join-item border-[#D1A054] text-[#2B3440]"
          placeholder="Email"
        />
        <button className="btn join-item rounded-r-full bg-[#D1A054] text-white hover:bg-[#2B3440]">
          Search
        </button>
      </div>
    </div>
  
    <div className="overflow-x-auto font-sans min-h-screen">
      <table className="table-auto w-full bg-gray-50 shadow-md rounded-lg">
        {/* head */}
        <thead className="bg-[#2B3440] text-white">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">User Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-[#2B3440]">
          {serveMeals?.map((meal, idx) => (
            <tr key={meal._id} className="hover:bg-[#D1A054]">
              <td className="px-4 py-2">{idx + 1}</td>
              <td className="px-4 py-2">{meal.title}</td>
              <td className="px-4 py-2">{meal?.name ? meal?.name : "Anonymous"}</td>
              <td className="px-4 py-2 text-center">{meal.email}</td>
              <td className="px-4 py-2 uppercase">{meal.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleServe(meal)}
                  className="btn btn-outline btn-sm text-[#2B3440] border-[#D1A054] hover:bg-[#D1A054] hover:text-white"
                >
                  <GiHotMeal className="mr-2" />
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
