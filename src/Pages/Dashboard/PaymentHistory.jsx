import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import PaymentHistoryCard from "../../Components/PaymentHistoryCard";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {data: payments = [],refetch} = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
             const res = await axiosSecure.get(`/payments?email=${user?.email}`)
             return res.data
        }
    })
    return (
        <div className="mt-12 ms-24">
      <div className="flex justify-evenly items-center">
        <h1 className="text-2xl font-bold">Payment History</h1>
        <h1 className="text-2xl font-bold">Total Payments: {payments.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Email</th>
                <th>Name</th>
                <th>Transaction Id</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                payments.map((payment,index) => <PaymentHistoryCard len={index} refetch={refetch} key={payment._id} payment={payment}/>)
              }
              
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

export default PaymentHistory;