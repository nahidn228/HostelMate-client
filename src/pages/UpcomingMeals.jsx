/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import "animate.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
import { GoStarFill } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "./../providers/AuthProvider";
const UpcomingMeals = () => {
  // const [meals] = useMeals();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [isLiked, setIsLiked] = useState(false);
  const { data: meals = [], refetch } = useQuery({
    queryKey: ["upcoming"],
    queryFn: async () => {
      const res = await axiosPublic.get("/upcoming");
      return res.data;
    },
  });
  useEffect(() => {
    refetch();

    console.log();
  }, [meals, refetch]);
  const handleDetails = (meal) => {
    Swal.fire({
      title: `Details of "${meal?.title}"  Coming Soon`,
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

  const handleLike = async (meal) => {
    const likes = meal?.likes + 1;
    const likedData = {
      likes,
      likedBy: user?.email,
    };

    try {
      if (!user) return toast.error("Please Login first to like our food");
      const likedUser = meal?.likedBy?.map((item) => item === user?.email);

      if (likedUser) {
        return toast.error(`${user?.displayName} you already Liked our food`);
      }
      const { data } = await axiosSecure.patch(
        `/upcomingMeals/${meal._id}`,
        likedData
      );
      console.log("Like response:", data);

      if (data?.modifiedCount > 0) {
        refetch();
        setIsLiked(true);
        toast.success(`Thank you ${user?.displayName} for liking our Food`);
      }
    } catch (error) {
      console.error("Failed to add like:", error);
      toast.error(error.response?.data?.message || "Failed to add like.");
    }
  };

  return (
    <div className=" w-11/12 md:max-w-screen-xl mx-auto py-10  min-h-screen flex flex-col justify-between">
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
                  <button
                    onClick={() => handleLike(meal)}
                    className="btn rounded-full text-xl btn-ghost"
                  >
                    {" "}
                    <AiFillLike />{" "}
                  </button>
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
