const PaymentHistoryUser = () => {
  return (
    <div className="p-6 bg-[#D1A054]  text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-mono mb-4">My All Payments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full text-sm bg-white text-gray-800 rounded-lg shadow-md">
          {/* Table Head */}
          <thead className="bg-[#2B3440] text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {/* Example Row */}
            <tr className="hover:bg-gray-100 transition duration-300">
              <th className="py-2 px-4">1</th>
              <td className="py-2 px-4">Total Price</td>
              <td className="py-2 px-4">Transaction_Id</td>
              <td className="py-2 px-4">
                <span className="px-3 py-1 rounded-lg text-sm bg-green-200 text-green-800 font-semibold uppercase">
                  Completed
                </span>
              </td>
            </tr>
            {/* Add more rows dynamically */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistoryUser;
