/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import "animate.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import UpcomingMealCard from "../components/UpcomingMealCard";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "./../providers/AuthProvider";
const UpcomingMeals = () => {
  // const [meals] = useMeals();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
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
    const likes = parseInt(meal?.likes + 1);
    if (user) {
      try {
        const likedData = {
          likes,
          likedBy: user?.email,
        };

        //check is user are already like this food

        const likedUser = meal?.likedBy.filter((item) => item === user?.email);

        if (likedUser) return toast.error("You already liked our food");
        const { data } = await axiosPublic.patch(
          `/upcomingMeals/${meal._id}`,
          likedData
        );
        console.log("Like added:", data);
        if (data?.modifiedCount > 0) {
          refetch();
          setIsLiked(true);
          toast.success(`Thank you ${user?.displayName} for like our Food`);
        }
      } catch (err) {
        console.error("Failed to add like:", err);
        toast.error(err);
      }
    } else {
      toast.error("Please Login first to like our food");
    }
  };

  return (
    <div className="container lg:px-6 py-10 mx-auto min-h-screen flex flex-col justify-between">
      <div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {meals?.map((meal) => (
            <UpcomingMealCard key={meal._id} meal={meal}></UpcomingMealCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeals;
