import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts/${user.email}`);
      return res.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
