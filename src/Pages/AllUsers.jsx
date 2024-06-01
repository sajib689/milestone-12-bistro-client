import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import UsersCard from "../Components/UsersCard";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AllUsers = () => {
  const {loading} = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
if(loading) return <p>Loading.......</p>
  return (
    <div className="mt-12 ms-24">
      <div className="flex justify-evenly items-center">
        <h1 className="text-2xl font-bold">All Users</h1>
        <h1 className="text-2xl font-bold">Total Users: {users.length}</h1>
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
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                users.map((user,index) => <UsersCard len={index} refetch={refetch} key={user._id} user={user}/>)
              }
              
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
