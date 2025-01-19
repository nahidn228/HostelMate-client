import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "./../../../providers/AuthProvider";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: paymentHistory = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  console.log(paymentHistory);
  return (
    <div>
      <h2 className="text-3xl">Total Payments: </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment, idx) => (
              <tr key={payment?._id} className="bg-base-200">
                <th>{idx + 1}</th>
                <td>$ {payment?.price}</td>
                <td>{payment?.transactionId}</td>
                <td className="py-2 px-4">
                <span className="px-3 py-1 rounded-lg text-sm bg-green-200 text-green-800 font-semibold uppercase">
                  Completed
                </span>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
