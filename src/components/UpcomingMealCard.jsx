/* eslint-disable react/prop-types */
import "animate.css";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillLike } from "react-icons/ai";
import { GoStarFill } from "react-icons/go";
import Swal from "sweetalert2";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { AuthContext } from "./../providers/AuthProvider";

const UpcomingMealCard = ({ meal }) => {
  const { user } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);
  const axiosPublic = useAxiosPublic();

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
    if (!user) {
      return toast.error("Please Login first to like our food");
    }
  

    try {
      const { data } = await axiosPublic.patch(`/meals/${meal._id}`, {
        likedBy: user?.email,
      });

      console.log("Like added:", data);
      if (data?.modifiedCount > 0) {
        toast.success(`Thank you ${user?.displayName} for liking our food`);
      } else {
        toast.error("Failed to like this meal. Please try again.");
      }
    } catch (err) {
      console.error("Failed to add like:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
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
  );
};

export default UpcomingMealCard;
