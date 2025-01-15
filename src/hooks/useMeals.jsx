import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: meals = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosPublic.get("/meals");
      return res.data;
    },
  });

  return [meals, refetch, isLoading, isError];
};

export default useMeals;
