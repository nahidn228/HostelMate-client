const PaymentHistory = () => {
  return (
    <div>
      <h2 className="text-2xl font-mono">My All Payments </h2>
      <div className="overflow-x-auto font-sans">
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
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Total Price</td>
              <td>Transaction_Id</td>
              <td>Status</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
