/* eslint-disable no-unused-vars */
import { Rating } from "@smastrom/react-rating";
import { useQuery } from "@tanstack/react-query";
import "animate.css";
import { useEffect, useState } from "react";
import { GoStarFill } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
const UpcomingMeals = () => {
  // const [meals] = useMeals();
  const axiosPublic = useAxiosPublic();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["upcomingMeals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcomingMeals");
      return res.data;
    },
  });

  console.log(meals);

  useEffect(() => {
    refetch();
  }, [meals, refetch]);
  const handleDetails = (meal) => {
    Swal.fire({
      title: `Details of ${meal?.title}  Coming Soon`,
      showClass: {
        popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
      },
      hideClass: {
        popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
      },
    });
  };

  return (
    <div className="container lg:px-6 py-10 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meals?.map((meal) => (
            <div key={meal._id} className=" group  ml-4">
              <div className="rounded-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden group">
                {/* Meal mealImage */}
                <img
                  src={meal?.mealImage}
                  alt={meal?.title}
                  className="w-full h-64 object-cover rounded-xl "
                />

                {/* "Hover" Text */}
                <div className="absolute inset-0 flex justify-center items-center text-black text-6xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black  bg-opacity-75 ">
                  <div className="absolute bg-gray-800 backdrop-blur-xl bg-opacity-35  top-3 left-3   text-2xl font-medium uppercase  px-2 py-1 text-black rounded">
                    <p className="flex items-center gap-1"></p>
                  </div>
                  <div className="absolute top-3 right-3 bg-gray-800 backdrop-blur-xl bg-opacity-35 text-sm font-medium uppercase text-white px-2 py-1 rounded flex gap-1 items-center">
                    <span className="text-yellow-400 font-bold">
                      <GoStarFill />
                    </span>
                    {meal?.rating}
                  </div>
                  <button
                    onClick={() => handleDetails(meal)}
                    className="btn btn-outline btn-accent"
                  >
                    Details
                  </button>
                </div>
              </div>

              {/* Movie Details */}
              <div className="p-4 flex flex-col space-y-4 ">
                <h2 className="text-2xl font-light text-black truncate group-hover:text-blue-500">
                  {meal?.title}
                </h2>
                <div className="flex justify-between items-center text-sm text-black">
                  <p className="tex-xs font-light">
                    $ <span className="text-xl">{meal?.price}</span>
                  </p>
                  <Rating
                    style={{ maxWidth: 80 }}
                    value={meal?.rating}
                    readOnly
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeals;
